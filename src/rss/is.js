// using RSS 2.0
export default function is(xml) {
  return xml.indexOf("<rss") > -1;
}
