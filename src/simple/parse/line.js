import findTagText from "xml-fns/findTagText.js";

import chunk from "../../utils/chunk.js";

export default function parse_line(xml, { debug = false, raw = false } = { debug: false, raw: false }) {
  const text = findTagText(xml, "georss:line");
  if (!text) return;

  let nums = text.trim().split(/[\n\t ,]+/g);
  if (!raw) {
    if (debug) console.log("[georss] converting to numbers");
    nums = nums.map(n => Number(n));
  }

  const points = chunk(nums, 2);
  if (debug) console.log("[georss] points:", points);

  points.forEach(point => point.reverse());

  return points;
}
