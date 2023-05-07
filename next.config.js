/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-firebaseui']);
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM({
  reactStrictMode: true,
});

