import is_gml from "../gml/is.js";
import is_simple from "../simple/is.js";
import is_w3c from "../w3c/is.js";

import parse_gml from "../gml/parse.js";
import parse_simple from "../simple/parse/where.js";
import parse_w3c from "../w3c/parse.js";

// parse the where part of an item/entry
export default function parse_where(xml, { raw = false } = { raw: false }) {
  if (is_w3c(xml)) {
    return parse_w3c(xml, { raw });
  } else if (is_simple(xml)) {
    return parse_simple(xml, { raw });
  } else if (is_gml(xml)) {
    return parse_gml(xml, { raw });
  }
}
