const config = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
};

export default config;

export type Config = typeof config;
