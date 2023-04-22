import { findGeometries, Geometry } from "geography-markup-language";

import findWhere from "../utils/find-where.js";

export default function parse(xml, { format = "geojson", raw = false } = {}) {
  if (format !== "geojson") throw new Error("[georss] invalid format");

  const tag = findWhere(xml);
  if (!tag) return;

  const { inner } = tag;
  if (!inner) return;

  const features = findGeometries(xml).map(geometry => Geometry(geometry, { format: "geojson" }));

  if (features.length === 0) return;

  if (features.length === 1) return features[0];

  return {
    type: "FeatureCollection",
    features
  };
}
