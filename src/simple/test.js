import test from "flug";
import is_simple from "./is.js";

import parse_box from "./parse/box.js";
import parse_line from "./parse/line.js";
import parse_point from "./parse/point.js";
import parse_polygon from "./parse/polygon.js";
import parse_where from "./parse/where.js";

test("simple: is_simple", ({ eq }) => {
  eq(is_simple("<georss:point>45.256 -71.92</georss:point>"), true);
});

test("simple: parse_box", ({ eq }) => {
  const xml = "<georss:box>42.943 -71.032 43.039 -69.856</georss:box>";
  eq(parse_box(xml), [-71.032, 42.943, -69.856, 43.039]);
  eq(parse_box(xml, { raw: true }), ["-71.032", "42.943", "-69.856", "43.039"]);
});

test("simple: parse_where", ({ eq }) => {
  eq(parse_where("<georss:point>45.256 -71.92</georss:point>"), {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: [-71.92, 45.256] }
  });
  eq(parse_where("<georss:point>45.256 -71.92</georss:point>", { raw: true }), {
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: ["-71.92", "45.256"] }
  });
});

test("simple: parse_line", ({ eq }) => {
  const xml = "<georss:line>45.256 -110.45 46.46 -109.48 43.84 -109.86</georss:line>";
  eq(parse_line(xml), [
    [-110.45, 45.256],
    [-109.48, 46.46],
    [-109.86, 43.84]
  ]);
  eq(parse_line(xml, { raw: true }), [
    ["-110.45", "45.256"],
    ["-109.48", "46.46"],
    ["-109.86", "43.84"]
  ]);
});

test("simple: parse_point", ({ eq }) => {
  eq(parse_point("<georss:point>45.256 -71.92</georss:point>"), [-71.92, 45.256]);
  eq(parse_point("<georss:point>45.256,-71.92</georss:point>"), [-71.92, 45.256]);
  eq(parse_point("\n<georss:point>\n45.256 ,\n-71.92\n\t</georss:point>"), [-71.92, 45.256]);
});

test("simple: parse_polygon", ({ eq }) => {
  const xml = "<georss:polygon>45.256 -110.45 46.46 -109.48 43.84 -109.86 45.256 -110.45</georss:polygon>";
  eq(parse_polygon(xml), [
    [-110.45, 45.256],
    [-109.48, 46.46],
    [-109.86, 43.84],
    [-110.45, 45.256]
  ]);
  eq(parse_polygon(xml, { raw: true }), [
    ["-110.45", "45.256"],
    ["-109.48", "46.46"],
    ["-109.86", "43.84"],
    ["-110.45", "45.256"]
  ]);
});
