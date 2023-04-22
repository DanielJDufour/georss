import findTagByName from "xml-utils/find-tag-by-name.js";
export default function parse_where(xml, { raw = false } = { raw: false }) {
  let lat = findTagByName(xml, "geo:lat");
  if (!lat) return;

  let long = findTagByName(xml, "geo:long");
  if (!long) return;

  lat = lat.inner;
  if (!lat) return;
  long = long.inner;
  if (!long) return;

  lat = lat.trim();
  long = long.trim();

  if (!raw) {
    lat = Number(lat);
    long = Number(long);
  }

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [long, lat]
    }
  };
}
