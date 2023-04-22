import hasAllTags from "xml-fns/hasAllTags.js";

export default function is_w3c(xml) {
  return hasAllTags(xml, ["geo:lat", "geo:long"]);
}
