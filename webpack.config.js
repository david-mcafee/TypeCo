var path = require("path");

module.exports = {
  context: __dirname,
  // entry point
  entry: "./lib/main.js",
  output: {
    // output path
    path: path.join(__dirname, "lib"),
    filename: "bundle.js",
  },
  module: {
    // configure module.loaders to use Babel transpilation for JSX and ES6
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
  // include source-map devtool
  devtool: "source-maps",
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
};
