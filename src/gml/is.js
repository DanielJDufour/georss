import hasTag from "xml-fns/hasTag.js";

export default function is_gml(xml) {
  return ["gml:envelope", "gml:Envelope", "gml:LineString", "gml:lineString", "gml:point", "gml:Point", "gml:polygon", "gml:Polygon"].some(tagName =>
    hasTag(xml, tagName)
  );
}
