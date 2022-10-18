import prodisc from "./prodisc";
import starframe from "./starframe";
import spinnvilldg from "./spinnvilldg";

export default async function handler() {
  console.time("store sitemap crawl");

  await Promise.all([prodisc(), starframe(), spinnvilldg()]);

  console.timeEnd("store sitemap crawl");
}
