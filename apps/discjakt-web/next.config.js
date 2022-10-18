const { withAxiom } = require("next-axiom");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "aceshopas-i01.mycdn.no",
      "aceshopas-i02.mycdn.no",
      "aceshopas-i03.mycdn.no",
      "aceshopas-i04.mycdn.no",
      "aceshopas-i05.mycdn.no",
      "aceshopas-i06.mycdn.no",
      "aceshop.no",
      "discjakt.blob.core.windows.net",
      "www.krokholdgs.no",
      "frisbeebutikke-i01.mycdn.no",
      "frisbeebutikke-i02.mycdn.no",
      "frisbeebutikke-i03.mycdn.no",
      "frisbeebutikke-i04.mycdn.no",
      "frisbeebutikke-i05.mycdn.no",
      "frisbeebutikke-i06.mycdn.no",
      "via.placeholder.com",
      "cdn.shopify.com",
      "usercontent.one",
      "www.dgshop.no",
      "static.wixstatic.com",
      "starframedisc-i01.mycdn.no",
      "starframedisc-i02.mycdn.no",
      "starframedisc-i03.mycdn.no",
      "starframedisc-i04.mycdn.no",
      "starframedisc-i05.mycdn.no",
      "starframedisc-i06.mycdn.no",
      "gurudiscgolf.no",
      "new.sunesport.no",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withAxiom(nextConfig);
