const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
      index:'./src/index.js',
      vendor: ["./public/javascripts/jquery.js"]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module:{
      rules:[
         {
          test:  /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: "babel-loader",
              options: {
                presets: ['env']
             }
          }
        },
        {
          test: /\.css$/,  
          use: ["style-loader","css-loader"]
        },
        // {
        //   test: /\.scss$/,  
        //   use: ["style-loader","css-loader","sass-loader"]
        // },
        {
         test: /\.(png|svg|jpg|gif)$/,
         use: ['file-loader']
        },
        {
          test: /\.vue$/,
          use: ['vue-loader']
         }
      ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "common.lib.js"
    })
  ]
};