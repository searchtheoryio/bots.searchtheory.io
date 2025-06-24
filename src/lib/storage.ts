import type { Source } from "@/data/sources";

import { BotRecord } from "@/data/bots";
import { put, PutBlobResult } from "@vercel/blob";

export type FetchInfo = {
  timestamp: string;
  count: number;
  checksum: string;
};

export type BotOverview = Array<BotOverviewItem>;
export type BotOverviewItem = {
  detail: BotRecord;
  lastFetch?: FetchInfo;
  lastChange?: string;
  latestPrefixes: Array<string>;
};

export type SourceOverview = Array<SourceOverviewItem>;
export type SourceOverviewItem = {
  source: Source;
  fetchInfo: FetchInfo;
  latestPrefixes: Array<string>;
  lastChange?: string;
};

const BLOB_CACHE_TTL = 60 * 60;
const BLOB_ENV = process.env.VERCEL_TARGET_ENV ?? "development";
const BLOB_HOST = `https://${process.env.BLOB_HOST}.public.blob.vercel-storage.com`;

/**
 * Fetch the latest source overview from blob storage.
 * @returns {Promise<SourceOverview>}
 */
export async function getSourceOverview(): Promise<SourceOverview> {
  return (
    await fetch(`${BLOB_HOST}/${BLOB_ENV}/sources.json`, {
      cache: "force-cache",
      next: { tags: ["source-overview"], revalidate: BLOB_CACHE_TTL },
    })
  ).json();
}

/**
 * Update the source overview in blob storage.
 * @param {SourceOverview} sourceOverview The source overview object to be written to blob storage.
 * @returns {Promise<PutBlobResult>}
 */
export async function putSourceOverview(
  sourceOverview: SourceOverview
): Promise<PutBlobResult> {
  return await put(
    `/${BLOB_ENV}/sources.json`,
    JSON.stringify(sourceOverview),
    {
      allowOverwrite: true,
      access: "public",
    }
  );
}

/**
 * Fetch the latest bot overview from blob storage.
 * @returns {Promise<BotOverview>}
 */
export async function getBotOverview(): Promise<BotOverview> {
  return (
    await fetch(`${BLOB_HOST}/${BLOB_ENV}/bots.json`, {
      cache: "force-cache",
      next: { tags: ["bot-overview"], revalidate: BLOB_CACHE_TTL },
    })
  ).json();
}

/**
 * Update the bot overview in blob storage.
 * @param {BotOverview} botOverview The bot overview object to be written to blob storage.
 * @returns {Promise<PutBlobResult>}
 */
export async function putBotOverview(
  botOverview: BotOverview
): Promise<PutBlobResult> {
  return await put(`/${BLOB_ENV}/bots.json`, JSON.stringify(botOverview), {
    allowOverwrite: true,
    access: "public",
  });
}
