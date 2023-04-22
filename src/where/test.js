import test from "flug";
import parse from "./parse.js";

test("parse_where(simple)", ({ eq }) => {
  const xml = "<georss:point>45.256 -71.92</georss:point>";
  eq(parse(xml), {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
  eq(parse(xml, { raw: true }), {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: ["-71.92", "45.256"] }
  });
});

test("parse_where(gml)", ({ eq }) => {
  const xml = "<georss:where> <gml:Point> <gml:pos>45.256 -71.92</gml:pos> </gml:Point> </georss:where>";
  eq(parse(xml), {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
});

test("parse gml with srs and 3 dimensions", ({ eq }) => {
  const xml = `   <georss:where>
  <gml:Point srsName="urn:ogc:def:crs:EPSG:9.0:4979" srsDimension="3">
     <gml:pos>42.3453 -156.2342 45</gml:pos>
  </gml:Point>
</georss:where>`;
  eq(parse(xml), {
    type: "Feature",
    properties: { srsName: "urn:ogc:def:crs:EPSG:9.0:4979" },
    geometry: { type: "Point", coordinates: [-156.2342, 42.3453] },
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:EPSG:9.0:4979" }
    }
  });
});
