import findTagByName from "xml-utils/find-tag-by-name.js";

export default function findWhere(xml) {
  const tag_names = ["georss:where", "georss:Where", "where", "Where"];
  for (let i = 0; i < tag_names.length; i++) {
    const name = tag_names[i];
    const tag = findTagByName(xml, name);
    if (tag) {
      return tag;
    }
  }
}
