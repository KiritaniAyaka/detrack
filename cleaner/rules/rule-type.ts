type MayPromise<T> = T | Promise<T>;

export interface RuleProcessor {
  name: string;
  process: (url: URL) => MayPromise<URL>;
  should: (url: URL) => boolean;
  type: RuleType;
  priority: number;
}

export type RuleType = "redirector" | "cleaner";
