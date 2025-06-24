import { sources } from "./sources";

type Ips =
  | { type: "static"; last_update: string; values: string[] }
  | { type: "dynamic"; source_id: (typeof sources)[number]["id"] };

export type BotRecord = {
  id: string;
  ips: Ips;
  name: string;
  docs: string;
  description: string;
  variations: BotRecordVariation[];
};

export type BotRecordVariation = {
  id: string;
  name: string;
  agent_pattern: string;
  agent_samples: string[];
};

/**
 * All of the bots we currently track.
 */
export const bots: BotRecord[] = [
  {
    id: "google-googlebot",
    name: "Googlebot",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googlebot",
    description: "The primary user agent used to crawl for Google Organic Search and Google Merchant Center.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*(?!.*Mobile).*Googlebot.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36",
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          "Googlebot/2.1 (+http://www.google.com/bot.html)",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile.*Googlebot.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        ],
      },
    ],
  },
  {
    id: "google-googlebot-image",
    name: "Googlebot Image",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googlebot-image",
    description: "The bot used by Google to index images for Google Organic Search.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*Googlebot-Image.*$",
        agent_samples: ["Googlebot-Image/1.0"],
      },
    ],
  },
  {
    id: "google-googlebot-video",
    name: "Googlebot Video",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googlebot-video",
    description: "The bot used by Google to index video for Google Organic Search.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*Googlebot-Video.*$",
        agent_samples: ["Googlebot-Video/1.0"],
      },
    ],
  },
  {
    id: "google-storebot",
    name: "Google StoreBot",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#google-storebot",
    description: "The bot used by Google to crawl product pages and checkout flows to collect e-commerce data.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*Storebot-Google.*(?!.*Mobile).*$",
        agent_samples: [
          "Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Safari/537.36",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Storebot-Google.*Mobile.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36",
        ],
      },
    ],
  },
  {
    id: "google-inspectiontool",
    name: "Google-InspectionTool",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#google-inspectiontool",
    description: "The bot used by Google Search Console's inspection tool.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*(?!.*Mobile).*Google-InspectionTool.*$",
        agent_samples: ["Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)"],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile.*Google-InspectionTool.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Google-InspectionTool/1.0;)",
        ],
      },
    ],
  },
  {
    id: "google-other",
    name: "GoogleOther",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googleother",
    description: "The generic bot used by various Google product teams.",
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*(?!.*Mobile).*GoogleOther.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GoogleOther) Chrome/W.X.Y.Z Safari/537.36",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile.*GoogleOther.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; GoogleOther)",
        ],
      },
    ],
  },
  {
    id: "google-other-image",
    name: "GoogleOther-Image",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googleother-image",
    description: "The bot used by Google for fetching image URLs.",
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*GoogleOther-Image.*$",
        agent_samples: ["GoogleOther-Image/1.0"],
      },
    ],
  },
  {
    id: "google-other-video",
    name: "GoogleOther-Video",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers#googleother-video",
    description: "The bot used by Google for fetching video URLs.",
    ips: { type: "dynamic", source_id: "google-googlebot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*GoogleOther-Video.*$",
        agent_samples: ["GoogleOther-Video/1.0"],
      },
    ],
  },
  {
    id: "google-adsbot",
    name: "Google AdsBot",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers#adsbot",
    description: "The bot used by Google to check web page ad quality.",
    ips: { type: "dynamic", source_id: "google-special-crawlers" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*AdsBot-Google(?!-Mobile).*$",
        agent_samples: ["AdsBot-Google (+http://www.google.com/adsbot.html)"],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*AdsBot-Google-Mobile.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)",
        ],
      },
    ],
  },
  {
    id: "google-adsense",
    name: "Google AdSense",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers#adsense",
    description: "The bot used by Google AdSense to help provide relevant ads for pages.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-special-crawlers" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*Mediapartners-Google.*$",
        agent_samples: ["Mediapartners-Google"],
      },
    ],
  },
  {
    id: "google-safety",
    name: "Google-Safety",
    docs: "https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers#google-safety",
    description: "The bot used by Google for abuse-specific use-cases, such as discovering malware.", // prettier-ignore
    ips: { type: "dynamic", source_id: "google-special-crawlers" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*Google-Safety.*$",
        agent_samples: ["Google-Safety"],
      },
    ],
  },
  {
    id: "microsoft-bingbot",
    name: "Bingbot",
    docs: "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0",
    description: "The primary user agent used to crawl for Bing's Organic Search.", // prettier-ignore
    ips: { type: "dynamic", source_id: "microsoft-bingbot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^(?!.*(?:Mobile|adidxbot)).*bingbot.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/W.X.Y.Z Safari/537.36",
          "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) W.X.Y.Z Safari/537.36",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile(?!.*adidxbot).*bingbot.*$",
        agent_samples: [
          "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36  (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
        ],
      },
    ],
  },
  {
    id: "microsoft-adidxbot",
    name: "AdIdxBot",
    docs: "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0",
    description: "The bot used to crawl for Bing Ads for the purposes of ad quality control.", // prettier-ignore
    ips: { type: "dynamic", source_id: "microsoft-bingbot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^(?!.*Mobile).*adidxbot.*$",
        agent_samples: [
          "Mozilla/5.0 (compatible; adidxbot/2.0; +http://www.bing.com/bingbot.htm)",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile.*adidxbot.*$",
        agent_samples: [
          "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; adidxbot/2.0; +http://www.bing.com/bingbot.htm)",
          "Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 530) like Gecko (compatible; adidxbot/2.0; +http://www.bing.com/bingbot.htm)",
        ],
      },
    ],
  },
  {
    id: "openai-searchbot",
    name: "OAI-SearchBot",
    docs: "https://platform.openai.com/docs/bots/",
    description: "The bot used by OpenAI to surface links in ChatGPT's search features.", // prettier-ignore
    ips: { type: "dynamic", source_id: "openai-searchbot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*OAI-SearchBot.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
        ],
      },
    ],
  },
  {
    id: "openai-chatgpt-user",
    name: "ChatGPT-User",
    docs: "https://platform.openai.com/docs/bots/",
    description: "The bot used by OpenAI's ChatGPT for user-initiated actions.",
    ips: {
      type: "dynamic",
      source_id: "openai-chatgpt-user",
    },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*ChatGPT-User.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
        ],
      },
    ],
  },
  {
    id: "openai-gptbot",
    name: "GPTBot",
    docs: "https://platform.openai.com/docs/bots/",
    description: "The bot used by OpenAI to fetch content and train their foundation models.", // prettier-ignore
    ips: { type: "dynamic", source_id: "openai-gptbot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*GPTBot.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot",
        ],
      },
    ],
  },
  {
    id: "perplexity-bot",
    name: "PerplexityBot",
    docs: "https://docs.perplexity.ai/guides/bots",
    description:
      "The bot used by Perplexity to surface links in their search features.",
    ips: { type: "dynamic", source_id: "perplexity-bot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*PerplexityBot.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
        ],
      },
    ],
  },
  {
    id: "perplexity-user",
    name: "Perplexity-User",
    docs: "https://docs.perplexity.ai/guides/bots",
    description: "The bot used by Perplexity for user-initiated actions.",
    ips: { type: "dynamic", source_id: "perplexity-user" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*Perplexity-User.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)",
        ],
      },
    ],
  },
  {
    id: "duckduckgo-duckduckbot",
    name: "DuckDuckBot",
    docs: "https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot",
    description: "The bot used to crawl for DuckDuckGo's search results.", // prettier-ignore
    ips: { type: "dynamic", source_id: "duckduckgo-duckduckbot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*DuckDuckBot.*$",
        agent_samples: [
          "DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)",
        ],
      },
    ],
  },
  {
    id: "duckduckgo-duckassistbot",
    name: "DuckAssistBot",
    docs: "https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot",
    description: "The bot used by DuckDuckGo to fetch pages in real-time for AI-assisted answers.", // prettier-ignore
    ips: { type: "dynamic", source_id: "duckduckgo-duckassistbot" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*DuckAssistBot.*$",
        agent_samples: [
          "DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)",
        ],
      },
    ],
  },
  {
    id: "mistralai-mistralai-user",
    name: "MistralAI-User",
    docs: "https://docs.mistral.ai/robots/",
    description: "The bot used by MistralAI's LeChat to respond to user actions.", // prettier-ignore
    ips: { type: "dynamic", source_id: "mistralai-user-ips" },
    variations: [
      {
        id: "default",
        name: "Default",
        agent_pattern: "^.*MistralAI-User.*$",
        agent_samples: [
          "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)",
        ],
      },
    ],
  },
  {
    id: "apple-applebot",
    name: "Applebot",
    docs: "https://support.apple.com/en-gb/119829",
    description: "The bot used by Apple to power search and generative AI products.", // prettier-ignore
    ips: { type: "dynamic", source_id: "apple-applebot" },
    variations: [
      {
        id: "desktop",
        name: "Desktop",
        agent_pattern: "^.*(?!.*Mobile).*Applebot.*$",
        agent_samples: [
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15(KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
        ],
      },
      {
        id: "mobile",
        name: "Mobile",
        agent_pattern: "^.*Mobile.*Applebot.*$",
        agent_samples: [
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1 (Applebot/0.1; +http://www.apple.com/go/applebot)",
        ],
      },
    ],
  },
];
