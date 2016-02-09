var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./spaceInvaders.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  module: {
    test: /\.node$/,
    loader: "node-loader"
  }
};
