import is_atom from "./atom/is.js";
import is_rss from "./rss/is.js";

import parse_atom from "./atom/parse.js";
import parse_rss from "./rss/parse.js";

export default function read(xml, { format = "geojson" } = {}) {
  if (is_atom(xml)) {
    return parse_atom(xml, { format });
  } else if (is_rss(xml)) {
    return parse_rss(xml, { format });
  } else {
    throw new Error("[georss] couldn't determine feed format");
  }
}
