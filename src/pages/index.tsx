import { useState } from "react";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import { BookIcon, ExternalLinkIcon, MegaphoneIcon } from "lucide-react";

import { getBots } from "@/lib/github";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Page } from "@/components/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";

export const getStaticProps: GetStaticProps<{
  bots: Awaited<ReturnType<typeof getBots>>;
}> = async () => {
  //
  // Get the latest bot info.
  let bots = await getBots();

  // Sort alphabetically.
  bots = bots.sort((a, b) => {
    if ((a.prefixesCreationTime ?? "") > (b.prefixesCreationTime ?? "")) return -1; // prettier-ignore
    if ((a.prefixesCreationTime ?? "") < (b.name ?? "")) return 1;
    return 0;
  });

  return { props: { bots }, revalidate: 3600 };
};

export default function Index({
  bots,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //
  const [filteredBots, setFilteredBots] = useState(bots);

  const doFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredBots(
      bots.filter((bot) => {
        const botName = bot.name.toLowerCase();
        const searchTerm = event.target.value.toLowerCase();
        return botName.includes(searchTerm);
      })
    );
  };

  return (
    <>
      <Head>
        <title>{`bot signature tracker - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <Alert>
          <MegaphoneIcon />
          <AlertTitle>New: Data Feeds</AlertTitle>
          <AlertDescription>
            <p>All bot signature + IP data is now on GitHub.</p>
            <Link className="underline" href="/data">
              Find out more &raquo;
            </Link>
          </AlertDescription>
        </Alert>

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mt-9">
          Bot Signature Tracker
        </h1>
        <p className="mt-1 mb-6 text-muted-foreground text-lg">
          Open source bot detection signatures.
        </p>

        <Input placeholder="Search for a bot..." onChange={doFilter} />

        <div className="rounded-md border mt-6">
          {filteredBots.length == 0 && (
            <div className="p-6">No bots matched your search.</div>
          )}
          {filteredBots.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Bot Name</TableHead>
                  <TableHead className="font-bold">
                    User Agent Patterns
                  </TableHead>
                  <TableHead>Total Prefixes</TableHead>
                  <TableHead>Latest Change</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBots.map((bot, botIndex) => (
                  <TableRow key={`bot_${botIndex}`}>
                    <TableCell>
                      <Link className="underline" href={`/bots/${bot.id}`}>
                        {bot.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {bot.variations.map((variation, variationId) => (
                        <div
                          className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm [&:not(:first-child)]:mt-2"
                          key={`variation_${variationId}`}
                        >
                          {variation.agent_pattern}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{bot.prefixes.length}</TableCell>
                    <TableCell>
                      {bot.prefixesCreationTime ? (
                        <div>{formatDate(bot.prefixesCreationTime)}</div>
                      ) : (
                        <>&ndash;</>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" asChild>
                        <Link href={`/bots/${bot.id}`}>
                          <BookIcon />
                          Details
                        </Link>
                      </Button>
                      {bot.docs && (
                        <Button variant="outline" className="ml-2" asChild>
                          <Link href={bot.docs} target="_blank">
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
          )}
        </div>
      </Page>
    </>
  );
}
