/* Validate the statistics object injected into the page. */

/* Validate the statistics object injected into the page. */
import { type BaseIssue, safeParse } from "valibot";
import type { Result } from "../../commons/collections/result.ts";
import { StatsSchema } from "../../schemas/stats.ts";
import type { Stats } from "../../types/browser.ts";

export type StatsParseResult = Result<Stats, BaseIssue<unknown>[]>;

function invalidStats(error: BaseIssue<unknown>[]): StatsParseResult {
  const result: StatsParseResult = { ok: false, error };
  return result;
}

function validStats(value: Stats): StatsParseResult {
  const result: StatsParseResult = { ok: true, value };
  return result;
}

export function parseStats(stats: unknown): StatsParseResult {
  const result = safeParse(StatsSchema, stats);
  if (!result.success) {
    const error = result.issues;
    return invalidStats(error);
  }

  return validStats(result.output);
}
