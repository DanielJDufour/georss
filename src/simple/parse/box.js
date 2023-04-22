import findTagText from "xml-fns/findTagText.js";

export default function parse_box(xml, { debug = false, raw = false } = { debug: false, raw: false }) {
  const text = findTagText(xml, "georss:box");
  if (!text) return;

  let nums = text.trim().split(/[\n\t ,]+/g);
  if (!raw) {
    if (debug) console.log("[georss] converting to numbers");
    nums = nums.map(n => Number(n));
  }

  const [ymin, xmin, ymax, xmax] = nums;

  return [xmin, ymin, xmax, ymax];
}
