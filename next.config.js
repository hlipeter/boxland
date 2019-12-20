const withPlugins = require("next-compose-plugins");
const less = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");

module.exports = withPlugins([
  withCSS,
  [less, { lessLoaderOptions: { javascriptEnabled: true } }]
]);
