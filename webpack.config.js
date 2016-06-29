var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');  //webpack通知

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'src/scripts/app.js');
var DEV_PATH = path.resolve(ROOT_PATH,'public');
var env = process.env.NODE_ENV;

var Model = {
  entry:[
    'webpack-hot-middleware/client',
    APP_PATH
  ],

  output: {
    path: DEV_PATH,
    filename: 'app[hash].js'
  },

  devServer: {
    progress:true,
    historyApiFallback: true
  },

  module:{
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
      },
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot','babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=1024'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=image/svg+xml'
      }
    ]
  },

  plugins: [
    new HtmlwebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({title: 'Webpack', alwaysNotify: true})
  ]
};

if(env === 'production') {
  Model.plugins.push(new webpack.optimize.UglifyJsPlugin({compress:{warnings: false}}));
}

module.exports = Model;
