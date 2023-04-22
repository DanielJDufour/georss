import test from "flug";
import parse_where from "./parse.js";

test("gml: parse_where(point)", ({ eq }) => {
  const expected_point = { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [-71.92, 45.256] } };
  eq(parse_where(`<georss:where><gml:Point> <gml:pos>45.256 -71.92</gml:pos> </gml:Point></georss:where>`), expected_point);
  eq(parse_where(`<georss:where><gml:Point> <gml:pos>45.256,-71.92</gml:pos> </gml:Point></georss:where>`), expected_point);
  eq(parse_where(`<georss:where><gml:Point> <gml:pos>45.256, -71.92</gml:pos> </gml:Point></georss:where>`), expected_point);
});

test("gml: parse where incuding point with CRS", ({ eq }) => {
  eq(
    parse_where(
      `<georss:where> <gml:Point srsName="urn:ogc:def:crs:EPSG:9.0:4979" srsDimension="3"> <gml:pos>42.3453 -156.2342 45</gml:pos> </gml:Point> </georss:where>`
    ),
    {
      type: "Feature",
      properties: { srsName: "urn:ogc:def:crs:EPSG:9.0:4979" },
      geometry: { type: "Point", coordinates: [-156.2342, 42.3453] },
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:EPSG:9.0:4979" }
      }
    }
  );
});

test("gml: parse where with polygon with srs", ({ eq }) => {
  eq(
    parse_where(
      `<georss:where> <gml:Polygon srsName="urn:ogc:def:crs:EPSG:9.0:26986"> <gml:exterior> <gml:LinearRing> <gml:posList> 45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45 </gml:posList> </gml:LinearRing> </gml:exterior> </gml:Polygon> </georss:where>`
    ),
    {
      type: "Feature",
      properties: { srsName: "urn:ogc:def:crs:EPSG:9.0:26986" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-110.45, 45.256],
            [-109.48, 46.46],
            [-109.86, 43.84],
            [-110.45, 45.256]
          ]
        ]
      },
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG:9.0:26986" } }
    }
  );
});
