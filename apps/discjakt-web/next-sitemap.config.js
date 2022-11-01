/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://discjakt.no",
  generateRobotsTxt: true,
  exclude: ["/dashboard*", "/account*", "/logout"],
};
