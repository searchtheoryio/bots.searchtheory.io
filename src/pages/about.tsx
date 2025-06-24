import Head from "next/head";
import Link from "next/link";

import { Page } from "@/components/page";

export default function About({}) {
  return (
    <>
      <Head>
        <title>{`about - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          About
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          As the number of SEO, marketing and AI platforms grows, so does the
          amount of bots used to crawl the web to collect and verify their data.
          Incorrectly blocking these bots via CDNs or other automated security
          systems can result in a decrease in visibility through Search Engines
          and LLMs, as well as problems running paid marketing campaigns.
          Ensuring that these good bots aren&apos;t blocked requires maintaining
          a list of &quot;good bots&quot; and up-to-date signatures for each
          which will enable automated systems to identify them and allow them to
          bypass rate limits or other blocks which are in place.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This tool aims to provide a<>&nbsp;</>
          <Link
            target="_blank"
            className="underline"
            href="https://github.com/searchtheoryio/bots.searchtheory.io"
          >
            community-led
          </Link>
          <>&nbsp;</>
          resource which brings together these signatures in one place.
        </p>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          What&apos;s in a signature?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Firstly, we group variations of the same bot together. For instance,
          <>&nbsp;</>
          <Link className="underline" href="/bots/google-googlebot">
            Googlebot
          </Link>
          <>&nbsp;</>
          has a Desktop and a Mobile variation - however they&apos;re ultimately
          the same bot. However, we provide signatures for each bot
          independently as it&apos;s useful to detect and report on them
          separately - e.g. if you want to compare crawl logs from Desktop vs.
          Mobile.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Next, we provide <b>User Agent Patterns</b> - regular expressions
          which can be used to match the HTTP User Agent header from bot
          requests to verify the bot. All patterns in this tool are
          automatically unit tested against all of the sample User Agents
          provided in the relevant published documentation.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Finally we fetch up-to-date <b>IP Prefixes</b> for each bot. Wherever
          possible these are fetched automatically from a published source every
          day to ensure that things stay as fresh as possible.
        </p>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Roadmap
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Signatures API (JSON / CSV)</li>
          <li>IP Changes API</li>
          <li>Show IP Change History in the UI</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Contributing
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Noticed that we&apos;ve missed a bot from the list? Spotted an
          inaccuracy? Please raise a PR over on
          <>&nbsp;</>
          <Link
            target="_blank"
            className="underline"
            href="https://github.com/searchtheoryio/bots.searchtheory.io"
          >
            GitHub
          </Link>
          <>.</>
        </p>
      </Page>
    </>
  );
}
