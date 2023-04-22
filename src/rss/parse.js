import rss from "really-simple-syndication";

import parseWhere from "../where/parse.js";
import featureCollection from "../utils/featureCollection.js";

// parse atom feeds
export default function parse(xml, options) {
  const features = [];

  const items = rss.parse(xml).items;

  items.forEach(item => {
    const properties = {};

    // parse the geometry
    // prefix attributes with "rss:...", so we are explict to user where props came from
    const { xml, ...attrs } = item;

    for (let key in attrs) {
      const value = attrs[key];
      if (key.indexOf(":") === -1) key = "rss:" + key;
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
