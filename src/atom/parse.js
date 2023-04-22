import atom from "atom-syndication-format";

import parseWhere from "../where/parse.js";
import featureCollection from "../utils/featureCollection.js";

// parse atom feeds
export default function parse(xml, options) {
  const features = [];

  const entries = atom.parse(xml).entries;

  entries.forEach(entry => {
    const properties = {};

    // parse the geometry
    // prefix attributes with "atom:...", so we are explict to user where props came from
    const { xml, ...attrs } = entry;

    for (let key in attrs) {
      const value = attrs[key];
      if (key.indexOf(":") === -1) key = "atom:" + key;
      properties[key] = value;
    }

    let geojson = featureCollection(parseWhere(xml));

    geojson.features.forEach(feature => {
      Object.assign(feature.properties, properties);
      features.push(feature);
    });
  });

  if (features.length === 1) {
    return features[0];
  } else {
    return {
      type: "FeatureCollection",
      features: features
    };
  }
}
