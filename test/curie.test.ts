

import { CURIES, expandCurie } from "../js/things/curie.ts";
import { assertEquals } from "https://deno.land/std/assert/mod.ts";


Deno.test('Single expansion of curie works as expected', () => {
  assertEquals(expandCurie(CURIES, '[birdwatch:swift]'), 'https://birdwatchireland.ie/birds/swift');
});

Deno.test('Repeated expansion of curie works as expected', () => {
  const repeated = expandCurie(CURIES, expandCurie(CURIES, '[birdwatch:swift]'));

  assertEquals(repeated, 'https://birdwatchireland.ie/birds/swift');
});
