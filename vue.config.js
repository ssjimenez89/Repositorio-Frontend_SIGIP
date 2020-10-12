const path = require("path");
const stencil = require("@stencil/webpack");
const stencilCollection = require("./stencil-register");
const ADMINISTRATOR_PATH = path.join(__dirname, "src", "core");
const VALIDATOR_PATH = path.join(__dirname, "src", "core", "validators");
const SHARED_PATH = path.join(__dirname, "src", "shared");
const APPLICATION_PATH = path.join(__dirname, "src", "applications");
const VUETIFY_PATH = path.join(__dirname, "node_modules", "vuetify", "es5");


module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {

    config.resolve.alias.set("@onei/core", ADMINISTRATOR_PATH);

    config.resolve.alias.set("@onei/applications", APPLICATION_PATH);

    config.resolve.alias.set("@vuetify", VUETIFY_PATH);

    config.resolve.alias.set("@shared", SHARED_PATH);

    config.resolve.alias.set("@validator", VALIDATOR_PATH);

    config.plugin("stencil").use(stencil.StencilPlugin, [{collections: stencilCollection}]);

    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag")
      .loader("graphql-tag/loader")
      .options({exclude: /node_modules/});
  },
};
