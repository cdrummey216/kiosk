var express = require('express');
var path = require('path');
var logger = require('morgan');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
//app.use('/users', users);

// node-gallery
/*
@param {string, required} staticFiles The directory where your album starts - can contain photos or images
@param {string, required} urlRoot The root URL which you pass into the epxress router in app.use (no way of obtaining this otherwise)
@param {string, optional} title Yup, you guessed it - the title to display on the root gallery
@param {boolean, optional} render Default to true. If explicitly set to false, rendering is left to the next function in the chain - see below. 
@param {string, optional} thumbnail.width Thumbnail image width, defaults '200'
@param {string, optional} thumbnail.height as above
@param {string, optional} image.width Large images width defaults '100%'
@param {string, optional} image.height as above
*/

//possible opp to customize node-gallery render w/ ligthtweight js render
app.use('/gallery', require('node-gallery')({
  staticFiles : 'public/images/',
  urlRoot : 'gallery', 
  title : 'demo gallery'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
