var express = require('express');
var path = require('path');
var logger = require('morgan');

var index = require('./routes/index');
var app = express();

//clock 
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var amqpHelper = require("./amqphelper");

var amqpConnection = amqpHelper.initializeAmqp();

server.listen(3000);

io.sockets.on('connection', function (socket) {
   var queueForSocket;
   var ctag;
   function amqpMessageHandler(message, headers, deliveryInfo) { 
        var m = JSON.parse(message.data.toString());
   		console.log("message", m);
        socket.emit('tick', m.tick);
    };
    amqpConnection.queue('', {},
         function(queue) {
         	 queueForSocket = queue;
             queue.bind("tickTock", '');  
             queue.subscribe(amqpMessageHandler).addCallback(function(ok) { ctag = ok.consumerTag; });;
    });

    socket.on('disconnect', function () {
    	console.log("disconnect");
    	queueForSocket.unsubscribe(ctag);
    });
});

//end clock



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
