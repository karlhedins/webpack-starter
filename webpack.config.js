const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  /* 
    We set src/print.js as a new entry point (print) and change the output as well, so that it will dynamically generate bundle names, based on the entry point names:
  */
  entry: {
    app: "./src/index.js"
  },

  // use the inline-source-map option, which is good for illustrative purposes (though not for production)
  // other example: eval-source-map - slow, byt yields the best quality SourceMaps for development.
  devtool: "inline-source-map",

  /*
    tells webpack-dev-server to serve the files from the dist directory on localhost:8080 
    keeps bundle files in memory and serves them as if they were real files mounted at the server's root path
    If your page expects to find the bundle files in different path, you can change this with the publicPath option in the dev server's configuration.

    You can aslo use the CLI to modify the webpack-dev-server configuration with the following command: webpack-dev-server --hotOnly
  */
  devServer: {
    contentBase: "./dist",
    hot: true
  },

  /* 
    clean the /dist folder before each build, so that only used files will be generated.

    HtmlWebpackPlugin by default will generate its own index.html file, even though we already have one in the dist/ folder. This means that it will replace our index.html file with a newly generated one.
  */
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Output Management"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  // -> generates our print.bundle.js and app.bundle.js
  output: {
    filename: "[name].bundle.js",
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
