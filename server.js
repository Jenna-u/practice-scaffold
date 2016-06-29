"use strict";
var http = require('http');
var express = require('express');
var path = require('path');
var webpack = require('webpack');
var config = require('./src/common/config.js');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var app = express();

var complier = webpack(webpackConfig);

app.use(webpackMiddleware(complier));
app.use(webpackHotMiddleware(complier));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(config.port, function(){
  console.log('server start at port: ' + config.port);
});
