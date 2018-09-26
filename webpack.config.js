const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const webpack = require("webpack");

const postCssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");

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
    contentBase: "./dist"
    // hot: true
  },

  /* 
    clean the /dist folder before each build, so that only used files will be generated.

    HtmlWebpackPlugin by default will generate its own index.html file, even though we already have one in the dist/ folder. This means that it will replace our index.html file with a newly generated one.
  */
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Output Management"
    })
    // new webpack.HotModuleReplacementPlugin()
  ],

  // -> generates our print.bundle.js and app.bundle.js
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  /* 
    From CRA docs:
    "postcss" loader applies autoprefixer to our CSS.
    "css" loader resolves paths in CSS and adds assets as dependencies.
    "style" loader turns CSS into JS modules that inject <style> tags.
    In production, we use a plugin to extract that CSS to a file, but
    in development "style" loader enables hot editing of CSS.
  */
  module: {
    rules: [
      {
        test: /\.css$/,
        // a <style> tag with the stringified css will be inserted into the <head> of your html file.
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [postCssImport(), postcssPresetEnv()]
            }
          }
        ]
      }
    ]
  }
};
