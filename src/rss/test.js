import { readFileSync } from "fs";

import test from "flug";
import parse from "./parse.js";

const gml_data = readFileSync("./test-data/gml.rss", "utf-8");
const simple_data = readFileSync("./test-data/simple.rss", "utf-8");
const w3c_data = readFileSync("./test-data/w3c.rss", "utf-8");

test("parse rss with simple", ({ eq }) => {
  eq(parse(simple_data), {
    type: "Feature",
    properties: {
      "rss:description": "December 28, 2007 05:24:17 GMT",
      "rss:link": "https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php",
      "rss:pubDate": new Date("2007-12-28T05:24:17.000Z"),
      "rss:title": "M 5.3, northern Sumatra, Indonesia"
    },
    geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
  });
});

test("parse rss with gml", ({ eq }) => {
  eq(parse(gml_data), {
    type: "Feature",
    properties: {
      "rss:author": "rajrsingh",
      "rss:description":
        'The heart and soul of the "new" Cambridge. Depending on where you \n' + "               stand, you can feel like you're in the 1970s or 2020.",
      "rss:guid": { guid: "00000111c36421c1321d3", isPermaLink: true },
      "rss:pubDate": new Date("2007-04-05T20:16:31.000Z"),
      "rss:title": "Central Square"
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [42.366661, 71.106216],
          [42.367104, 71.105576],
          [42.367134, 71.104378],
          [42.366249, 71.103729],
          [42.363331, 71.098793],
          [42.362541, 71.101028],
          [42.366123, 71.106865],
          [42.366661, 71.106216]
        ]
      ]
    }
  });
});

test("parse rss with w3c", ({ eq }) => {
  eq(parse(w3c_data), {
    type: "Feature",
    properties: {
      "rss:description": "December 28, 2007 05:24:17 GMT",
      "geo:lat": 5.5319,
      "geo:long": 95.8972,
      "rss:link": "https://earthquake.usgs.gov/eqcenter/recenteqsww/Quakes/us2007llai.php",
      "rss:pubDate": new Date("2007-12-28T05:24:17.000Z"),
      "rss:title": "M 5.3, northern Sumatra, Indonesia"
    },
    geometry: { type: "Point", coordinates: [95.8972, 5.5319] }
  });
});
