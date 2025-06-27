import type { NextApiRequest, NextApiResponse } from "next";

import type {
  FetchInfo,
  BotOverview,
  SourceOverview,
  SourceOverviewItem,
} from "@/lib/storage";

import { sources } from "@/data/sources";
import { bots } from "@/data/bots";
import { checksum } from "@/lib/utils";

import {
  getSourceOverview,
  putBotOverview,
  putSourceOverview,
} from "@/lib/storage";

type StandardPrefixData = {
  creationTime: string;
  prefixes: [
    {
      ipv4Prefix?: string;
      ipv6Prefix?: string;
    }
  ];
};

/**
 * Parse a standard prefix file response and returns an array of prefixes.
 * @param {StandardPrefixData} prefixData The full prefix info response from the remote API.
 * @returns {Array<string>}
 */
function parseStandardPrefixDataIPs(
  prefixData: StandardPrefixData
): Array<string> {
  return prefixData.prefixes.map((p) => {
    if (p.ipv4Prefix) return p.ipv4Prefix;
    if (p.ipv6Prefix) return p.ipv6Prefix;
    return;
  }).filter((p) => typeof p == "string"); // prettier-ignore
}

/**
 * Fetch and structure data for all sources.
 * @returns {Promise<SourceOverview>}
 */
async function buildSourceOverview(): Promise<SourceOverview> {
  //
  // Get the last source overview.
  let lastSourceOverview: SourceOverviewItem[] = [];
  try {
    lastSourceOverview = await getSourceOverview();
  } catch (e) {
    console.error("Failed to fetch the previous source overview", e);
  }

  // Build the new source overview.
  const sourceOverview: SourceOverview = [];
  for (const source of sources) {
    try {
      //
      // Fetch prefix data from the remote file.
      const apiResponse = (await (await fetch(source.url)).json()) as StandardPrefixData; // prettier-ignore
      const apiResponseChecksum = checksum(JSON.stringify(apiResponse));

      // Extract prefix data into a simple list.
      const latestPrefixes = parseStandardPrefixDataIPs(apiResponse);

      // Track metadata for this fetch.
      const fetchInfo: FetchInfo = {
        timestamp: new Date().toISOString(),
        checksum: apiResponseChecksum,
        count: latestPrefixes.length,
      };

      // Get the last fetch information for this source.
      const lastSourceInfo = lastSourceOverview.find((s) => s.source.id === source.id); // prettier-ignore

      // Check for a change by comparing checksums.
      let lastChange;
      if (lastSourceInfo) {
        if (lastSourceInfo?.fetchInfo.checksum !== fetchInfo.checksum) {
          lastChange = new Date().toISOString();
        } else if (lastSourceInfo?.fetchInfo) {
          lastChange = lastSourceInfo.fetchInfo.timestamp;
        }
      }

      //
      sourceOverview.push({ source, fetchInfo, latestPrefixes, lastChange });
    } catch (e) {
      console.error(`Failed to fetch source ${source.id}`, e);
    }
  }

  return sourceOverview;
}

/**
 * Structure data for all bots.
 * @param {SourceOverview} sourceOverview The latest SourceOverview to supplement bot data with.
 * @returns {SourceOverview>}
 */
async function buildBotOverview(
  sourceOverview: SourceOverview
): Promise<BotOverview> {
  //
  const botOverview = [];

  for (const bot of bots) {
    //
    let lastFetch;
    let lastChange;
    let latestPrefixes: string[] = [];

    if (bot.ips.type == "dynamic") {
      const botSourceId = bot.ips.source_id;
      const botSourceOverview = sourceOverview.find((s) => s.source.id === botSourceId); // prettier-ignore
      if (botSourceOverview) {
        lastFetch = botSourceOverview.fetchInfo;
        lastChange = botSourceOverview.lastChange;
        latestPrefixes = botSourceOverview.latestPrefixes;
      }
    } else if (bot.ips.type == "static") {
      latestPrefixes = bot.ips.values;
    }

    botOverview.push({ detail: bot, lastFetch, lastChange, latestPrefixes });
  }

  return botOverview;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  // Ensure that this is an authorized cron execution from Vercel.
  const authHeader = req.headers?.["authorization"];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  // Build and persist source data.
  const sourceOverview = await buildSourceOverview();
  await putSourceOverview(sourceOverview);

  // Build and persist bot data.
  const botOverview = await buildBotOverview(sourceOverview);
  await putBotOverview(botOverview);

  res.status(200).json({ status: "ok" });
}
