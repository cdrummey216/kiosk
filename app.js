var express = require('express');
var path = require('path');
var logger = require('morgan');

var index = require('./routes/index');
var app = express();

//clock

//Weather
var weather = require('weather-js');
weather.find({search: 'Charlotte, NC', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
  let rawdata = JSON.stringify(result, null, 2); 
  let weather_data = JSON.parse(rawdata);
   
   
   
   
});

//End Weather

//calendar https://fullcalendar.io/docs/initialize-es6
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
      plugins: [ listPlugin ],
      defaultView: 'listWeek',
      events: {
         url: 'events.json',
         failure: function() {
          document.getElementById('script-warning').style.display = 'block'
        }   
      }
  });

  calendar.render();
});

//end calendar

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);



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
