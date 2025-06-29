export type Bot = {
  id: string;
  name: string;
  docs: string;
  description: string;
  prefixes: string[];
  prefixesCreationTime?: string;
  variations: {
    id: string;
    name: string;
    agent_pattern: string;
    agent_samples: string[];
  }[];
};

export async function getBots(): Promise<Bot[]> {
  return (await (
    await fetch(
      "https://raw.githubusercontent.com/searchtheoryio/signatures/refs/heads/main/dist/signatures-with-metadata.json"
    )
  ).json()) as Bot[];
}
