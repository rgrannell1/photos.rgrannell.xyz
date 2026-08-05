/*
 * Check that the build publishes machine-readable version metadata.
 */

type VersionMetadata = {
  version: unknown;
  buildTime: unknown;
};

Deno.test("version contains a build ID and ISO build time", async () => {
  const text = await Deno.readTextFile("version");
  const metadata = JSON.parse(text) as VersionMetadata;

  if (typeof metadata.version !== "string" || metadata.version.length === 0) {
    throw new Error("version must contain a non-empty build ID");
  }

  if (
    typeof metadata.buildTime !== "string" ||
    new Date(metadata.buildTime).toISOString() !== metadata.buildTime
  ) {
    throw new Error("version must contain an ISO build time");
  }
});
