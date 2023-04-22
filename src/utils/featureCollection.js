export default function featureCollection(geojson) {
  if (geojson.type === "FeatureCollection") {
    return geojson;
  } else if (geojson.type === "Feature") {
    return { type: "FeatureCollection", features: [geojson] };
  }
}
