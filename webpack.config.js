var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');  //webpack通知

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'src/scripts/app.js');
var DEV_PATH = path.resolve(ROOT_PATH,'public');


//开发环境与发布环境配置
var definePlugin = new webpack.DefinePlugin({
  __DEV__:JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
  __PRERELEASE__:JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
});


module.exports = {
  entry:[
    'webpack-dev-server/client?http://localhost:8033',
    'webpack/hot/only-dev-server',
    APP_PATH
  ],

  output: {
    path: DEV_PATH,
    filename: 'app[hash].js'
  },

  //devtool: '#source-map',

  devServer: {
    hot:true,
    inline:true,
    port: 8033,
    progress:true,
    historyApiFallback: true
  },

  module:{
    loaders: [
      {
        //css-moduless
        test: /\.scss$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', query:{"presets": ["es2015", "stage-0", "react"]}
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
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({title: 'Webpack', alwaysNotify: true}),
    process.env['NODE_ENV'] === 'production' ? new webpack.optimize.UglifyJsPlugin({compress:false}) : []
  ]
};
