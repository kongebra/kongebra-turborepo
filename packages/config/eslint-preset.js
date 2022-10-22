module.exports = {
  extends: ["next", "turbo", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
    // react: {
    //   version: "detect",
    // },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "turbo/no-undeclared-env-vars": "off",
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    es6: true,
  },
};
