import { createLogger } from "@kiritaniayaka/logging";
import { RuleProcessor } from "./rule-type.ts";
import { removeAllSearchParams } from "../utils/url.ts";

const SHARE_URL_PREFIX = "/mpa/html/weijd/weijd-job/";
const PC_URL_PREFIX = "/job_detail/";

const cleanURLTemplate = (id: string) =>
  `https://www.zhipin.com/job_detail/${id}.html`;

const logger = createLogger("BossZhipinCleaner");

export const bossZhipinCleaner: RuleProcessor = {
  name: "bossZhipinCleaner",
  should: (url) => url.hostname.endsWith("zhipin.com"),
  process: (url) => {
    if (url.pathname.startsWith(SHARE_URL_PREFIX)) {
      const jobId = url.pathname.substring(SHARE_URL_PREFIX.length).match(/\w+/);
      if (!jobId) {
        logger.warn("Could not extract job id from share url", url);
        return url;
      }
      return new URL(cleanURLTemplate(jobId[0]));
    }
    if (url.pathname.startsWith(PC_URL_PREFIX)) {
      return removeAllSearchParams(url);
    }
    logger.warn("Unknown boss zhipin url format", url);
    return url;
  },
  type: "cleaner",
  priority: 1,
};
