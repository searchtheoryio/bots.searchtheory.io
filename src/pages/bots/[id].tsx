import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";

import Head from "next/head";

import { Bot, getBots } from "@/lib/github";

import { Page } from "@/components/page";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const getStaticPaths = (async () => {
  //
  const botOverview = await getBots();
  return {
    fallback: false,
    paths: botOverview.map((bot) => ({
      params: {
        id: bot.id,
      },
    })),
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps<{
  bot: Bot;
}> = async (context) => {
  //
  const botOverview = await getBots();
  const bot = botOverview.find((b) => b.id === context?.params?.id);
  if (!bot) return { notFound: true };
  return { props: { bot }, revalidate: 3600 };
};

export default function Home({
  bot,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${bot.name} - bot signature tracker - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mt-6">
          {bot.name}
        </h1>
        <p className="mt-3 mb-15 text-muted-foreground text-lg">
          {bot.description}
        </p>

        <h2 className="scroll-m-20 mb-6 border-b pb-2 text-3xl font-semibold tracking-tight">
          Variations ({bot.variations.length})
        </h2>
        {bot.variations.map((variation) => (
          <>
            <Card className="[&:not(:first-child)]:mt-6">
              <CardHeader>
                <CardTitle>
                  {bot.name} - {variation.name}
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
        <pre className="mt-6 p-6 rounded-md border h-[300px] overflow-scroll bg-muted">
          {bot.prefixes.join("\n")}
        </pre>
      </Page>
    </>
  );
}
