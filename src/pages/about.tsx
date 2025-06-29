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
            href="https://github.com/searchtheoryio/signatures"
          >
            community-led
          </Link>
          <>&nbsp;</>
          resource which brings together these signatures in one place.
        </p>

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
            href="https://github.com/searchtheoryio/signatures"
          >
            GitHub
          </Link>
          <>.</>
        </p>
      </Page>
    </>
  );
}
