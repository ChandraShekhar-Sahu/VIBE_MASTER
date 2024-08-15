const path = require("path");

module.exports = {
  mode: "production", // Set Webpack mode to production
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Add this rule for CSS files
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Ensure postcss-loader is included
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
