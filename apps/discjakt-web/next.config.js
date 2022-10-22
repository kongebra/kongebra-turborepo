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
      "frisbeefeber-i01.mycdn.no",
      "frisbeefeber-i02.mycdn.no",
      "frisbeefeber-i03.mycdn.no",
      "frisbeefeber-i04.mycdn.no",
      "frisbeefeber-i05.mycdn.no",
      "frisbeefeber-i06.mycdn.no",
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://*.discjakt.no",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://discjakt*.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = withAxiom(nextConfig);
