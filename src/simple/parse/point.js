import findTagText from "xml-fns/findTagText.js";

export default function parse_point(xml, { raw = false } = {}) {
  const inner = findTagText(xml, "georss:point");
  if (!inner) return;
  let point = inner.split(/[ ,]+/g);
  if (!raw) point = point.map(n => Number(n));
  point.reverse(); // [lat, lon] to [lon, lat]
  return point;
}
