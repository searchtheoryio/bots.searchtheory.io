import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { BookIcon, ExternalLinkIcon } from "lucide-react";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getBotOverview } from "@/lib/storage";
import { formatDate } from "@/lib/utils";

export const getServerSideProps: GetServerSideProps<{
  bots: Awaited<ReturnType<typeof getBotOverview>>;
}> = async () => {
  //
  // Get the latest bot info.
  let bots = await getBotOverview();

  // Sort alphabetically.
  bots = bots.sort((a, b) => {
    if (a.detail.name < b.detail.name) return -1;
    if (a.detail.name > b.detail.name) return 1;
    return 0;
  });

  return { props: { bots } };
};

export default function Index({
  bots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{`bot signature tracker - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mt-6">
          Bot Signature Tracker
        </h1>
        <p className="mt-3 mb-15 text-muted-foreground text-lg">
          Open detection signatures for important bots.
        </p>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Bot Name</TableHead>
                <TableHead className="font-bold">User Agent Patterns</TableHead>
                <TableHead className="font-bold text-right">
                  IP Prefixes
                </TableHead>
                <TableHead className="font-bold text-right">
                  Latest IP Change
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bots.map((bot, botIndex) => (
                <TableRow key={`bot_${botIndex}`}>
                  <TableCell>
                    <Link className="underline" href={`/bots/${bot.detail.id}`}>
                      {bot.detail.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {bot.detail.variations.map((variation, variationId) => (
                      <div
                        className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm [&:not(:first-child)]:mt-2"
                        key={`variation_${variationId}`}
                      >
                        {variation.agent_pattern}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">
                    {bot.latestPrefixes.length}
                  </TableCell>
                  <TableCell className="text-right">
                    {bot.lastChange ? <>{formatDate(bot.lastChange)}</> : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" asChild>
                      <Link href={`/bots/${bot.detail.id}`}>
                        <BookIcon />
                        Details
                      </Link>
                    </Button>
                    {bot.detail.docs && (
                      <Button variant="outline" className="ml-2" asChild>
                        <Link href={bot.detail.docs} target="_blank">
                          <ExternalLinkIcon />
                          Docs
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Page>
    </>
  );
}
