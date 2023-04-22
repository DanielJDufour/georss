import test from "flug";
import parse_where from "./parse.js";

test("w3c: parse_where", ({ eq }) => {
  eq(
    parse_where(`<item>
  <pubDate>Fri, 28 Dec 2007 05:24:17 GMT</pubDate>
  <title>M 5.3, northern Sumatra, Indonesia</title>
  <description>December 28, 2007 05:24:17 GMT</description>
  <link>https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php</link>
  <geo:lat>5.5319</geo:lat>
  <geo:long>95.8972</geo:long>
</item>`),
    {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
    }
  );
});
