import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";

import Head from "next/head";

import { getBotOverview, type BotOverviewItem } from "@/lib/storage";

import { Page } from "@/components/page";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const getStaticPaths = (async () => {
  //
  const botOverview = await getBotOverview();
  return {
    fallback: false,
    paths: botOverview.map((bot) => ({
      params: {
        id: bot.detail.id,
      },
    })),
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps<{
  bot: BotOverviewItem;
}> = async (context) => {
  //
  const botOverview = await getBotOverview();
  const bot = botOverview.find((b) => b.detail.id === context?.params?.id);
  if (!bot) return { notFound: true };
  return { props: { bot }, revalidate: 3600 };
};

export default function Home({
  bot,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${bot.detail.name} - bot signature tracker - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mt-6">
          {bot.detail.name}
        </h1>
        <p className="mt-3 mb-15 text-muted-foreground text-lg">
          {bot.detail.description}
        </p>

        <h2 className="scroll-m-20 mb-6 border-b pb-2 text-3xl font-semibold tracking-tight">
          Variations ({bot.detail.variations.length})
        </h2>
        {bot.detail.variations.map((variation) => (
          <>
            <Card className="[&:not(:first-child)]:mt-6">
              <CardHeader>
                <CardTitle>
                  {bot.detail.name} - {variation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label>User Agent Pattern</Label>
                <div className="mt-3 px-3 py-2 text-sm bg-muted rounded-md border overflow-scroll">
                  {variation.agent_pattern}
                </div>
                <Label className="mt-6 mb-3">User Agent Samples</Label>
                {variation.agent_samples.map((sample, sampleId) => (
                  <div
                    className="mt-3 px-3 py-2 text-sm bg-muted rounded-md border overflow-scroll whitespace-nowrap"
                    key={`sample_${sampleId}`}
                  >
                    {sample}
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ))}

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12">
          IP Prefixes
        </h2>
        {bot.lastFetch && (
          <p className="mt-3 text-muted-foreground">
            <>Prefixes fetched automatically at </>
            <>{formatDate(bot.lastFetch.timestamp)}.</>
          </p>
        )}
        <pre className="mt-6 p-6 rounded-md border h-[300px] overflow-scroll bg-muted">
          {bot.latestPrefixes.join("\n")}
        </pre>
      </Page>
    </>
  );
}
