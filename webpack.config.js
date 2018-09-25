const path = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // a <style> tag with the stringified css will be inserted into the <head> of your html file.
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
