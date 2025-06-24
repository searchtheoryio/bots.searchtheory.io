/**
 * This file contains all of the IP sources which will be fetched each hour.
 */

export type Source = { id: string; url: string };

export const sources: Source[] = [
  {
    id: "google-googlebot",
    url: "https://developers.google.com/static/search/apis/ipranges/googlebot.json", // prettier-ignore
  },
  {
    id: "google-special-crawlers",
    url: "https://developers.google.com/static/search/apis/ipranges/special-crawlers.json", // prettier-ignore
  },
  {
    id: "openai-searchbot",
    url: "https://openai.com/searchbot.json",
  },
  {
    id: "openai-chatgpt-user",
    url: "https://openai.com/chatgpt-user.json",
  },
  {
    id: "openai-gptbot",
    url: "https://openai.com/gptbot.json",
  },
  {
    id: "perplexity-bot",
    url: "https://www.perplexity.com/perplexitybot.json",
  },
  {
    id: "perplexity-user",
    url: "https://www.perplexity.com/perplexity-user.json",
  },
  {
    id: "microsoft-bingbot",
    url: "https://www.bing.com/toolbox/bingbot.json",
  },
  {
    id: "duckduckgo-duckduckbot",
    url: "https://duckduckgo.com/duckduckbot.json",
  },
  {
    id: "duckduckgo-duckassistbot",
    url: "https://duckduckgo.com/duckassistbot.json",
  },
  {
    id: "apple-applebot",
    url: "https://search.developer.apple.com/applebot.json",
  },
  {
    id: "mistralai-user-ips",
    url: "https://mistral.ai/mistralai-user-ips.json",
  },
] as const;
