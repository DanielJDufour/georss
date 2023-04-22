import { readFileSync } from "fs";

import test from "flug";
import parse_atom from "./parse.js";

const gml_data = readFileSync("./test-data/gml.atom", "utf-8");
const simple_data = readFileSync("./test-data/simple.atom", "utf-8");
const w3c_data = readFileSync("./test-data/w3c.atom", "utf-8");

test("parse atom with simple", ({ eq }) => {
  eq(parse_atom(simple_data), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("parse atom with gml", ({ eq }) => {
  eq(parse_atom(gml_data), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("parse atom with w3c", ({ eq }) => {
  eq(parse_atom(w3c_data), {
    type: "Feature",
    properties: {
      "atom:id": "urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",
      "atom:title": "M 3.2, Mona Passage",
      "atom:updated": new Date("2005-08-17T07:02:32.000Z"),
      "atom:summary": { summary: "We just had a big one." },
      "atom:links": [{ href: "http://example.org/2005/09/09/atom01" }]
    },
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});
