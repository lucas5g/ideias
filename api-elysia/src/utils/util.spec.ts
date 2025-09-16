import { describe, it } from "bun:test";
import { gemini } from "./gemini";

describe("Utils", () => {
  it('gemini', async () => {
    const res = await gemini('água');

    console.log(res);
  })
});