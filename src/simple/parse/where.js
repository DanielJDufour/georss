import parse_point from "./point.js";

/**
 * @name parse_where
 * @param {String} xml
 * @param {Object} options
 * @returns {GeoJSON} geojson
 */
export default function parse_where(xml, { raw = false } = { raw: false }) {
  const point = parse_point(xml, { raw });
  if (point) {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: point
      }
    };
  }
}
