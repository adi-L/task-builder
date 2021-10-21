const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return merge(common(env, argv), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: __dirname + "./dist",
      hot: true,
      host: "localhost",
      inline: true,
      liveReload: true,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      })
    ]
  })
};

