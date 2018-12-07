var path = require('path');
var nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'public');

var env = process.env.NODE_ENV || 'development';

console.log(env)

if(env == "development") {
  BUILD_DIR = path.resolve(__dirname, 'public');
}

var config = {
  entry: SRC_DIR + '/src/main.js',
  output: {
    path: BUILD_DIR + '/src',
    filename: 'bundle.js',
    publicPath: '/src'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: SRC_DIR,
      loader: 'babel-loader',
      query: {
        presets : ["es2015", "react", "stage-0"],
        plugins: ["transform-decorators-legacy", "transform-class-properties", ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
          }]
        ]
      }
    }, {
      test: /\.(css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/img/[name].[ext]"
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
   plugins: [
    new ExtractTextPlugin('stylem.css')
  ],
  devServer: {
    contentBase: SRC_DIR,
    compress: true,
    port: 9090
  },
  watch: true
}

module.exports = config;