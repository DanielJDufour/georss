import hasTag from "xml-fns/hasTag.js";

export default function is_simple(xml) {
  return hasTag(xml, "georss:point");
}
