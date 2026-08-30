/* Values injected by the built page and exposed through window. */

/* Values injected by the built page and exposed through window. */
import type { InferOutput } from "valibot";
import type { StatsSchema } from "../schemas/stats.ts";

export type EnvConfig = {
  photos_url: string;
  publication_id: string;
};

export type FlagManifest = {
  sprite: string;
  cellWidth: number;
  cellHeight: number;
  count: number;
  positions: Record<string, number>;
  big: Record<string, string>;
};

export type Stats = InferOutput<typeof StatsSchema>;

export type AppWindow = typeof window & {
  stats: Stats;
  envConfig: EnvConfig;
  flags: FlagManifest;
};
