import test from "flug";
import chunk from "./chunk.js";

test("chunk", ({ eq }) => {
  eq(chunk([45.256, -110.45, 46.46, -109.48, 43.84, -109.86, 45.256, -110.45]), [
    [45.256, -110.45],
    [46.46, -109.48],
    [43.84, -109.86],
    [45.256, -110.45]
  ]);
});
