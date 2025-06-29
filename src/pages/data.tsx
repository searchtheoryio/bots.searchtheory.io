import Head from "next/head";
import Link from "next/link";

import { Page } from "@/components/page";

export default function Data({}) {
  return (
    <>
      <Head>
        <title>{`about - bots.searchtheory.io`}</title>
      </Head>
      <Page>
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Data
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          All of the data used to build this site is available on GitHub.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong className="underline">
              <Link href="https://raw.githubusercontent.com/searchtheoryio/signatures/refs/heads/main/dist/ips.json">
                ips.json
              </Link>
            </strong>
            <p>Up-to-date prefixes for each source.</p>
          </li>
          <li>
            <strong className="underline">
              <Link href="https://raw.githubusercontent.com/searchtheoryio/signatures/refs/heads/main/dist/signatures.json">
                signatures.json
              </Link>
            </strong>
            <p>Up-to-date signatures for each bot.</p>
          </li>
          <li>
            <strong className="underline">
              <Link href="https://raw.githubusercontent.com/searchtheoryio/signatures/refs/heads/main/dist/signatures-with-metadata.json">
                signatures-with-metadata.json
              </Link>
            </strong>
            <p>Up-to-date bot information. Used to generate this site.</p>
          </li>
        </ul>
      </Page>
    </>
  );
}
