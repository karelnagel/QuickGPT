// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  async headers() {
    return [
    {
      source: "/api/(.*)",
      headers: [
     { key: "Access-Control-Allow-Origin", value: "*" },
     { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
    ]
    }
    ]
},
};
export default config;
