/* Validate the statistics object injected into the page. */

import { type BaseIssue, safeParse } from "valibot";
import type { Result } from "../../commons/result.ts";
import { StatsSchema } from "../../schemas/stats.ts";
import type { Stats } from "../../types/browser.ts";

export type StatsParseResult = Result<Stats, BaseIssue<unknown>[]>;

export function parseStats(stats: unknown): StatsParseResult {
  const result = safeParse(StatsSchema, stats);
  if (!result.success) {
    return { ok: false, error: result.issues };
  }

  return { ok: true, value: result.output };
}
