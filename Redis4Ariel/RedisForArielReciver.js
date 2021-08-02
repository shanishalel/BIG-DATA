var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

redisClient.subscribe('message'); 
// redisClient.subscribe('NumberOfCars'); 

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test', function (req, res) {
    redisClient.hgetall('Sections', function (err, object) {
        console.log(object);
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


redisClient.on("message", function (channel, data) {
    var data = JSON.parse(data);
    // // do things with the data
    // data.variable1 = 3;
    // data.variable2 = "hello";
    console.log(data);
    // console.log(redisClient.get(NumberOfCars));
   
});

redisClient.hmget('Sections', ["one", "two","three","four","five"], function (err, object) {
    console.log(object);
});
// redisClient.on("NumberOfCars", function (channel, data) {
//     var data = JSON.parse(data);
//     // // do things with the data
//     // data.variable1 = 3;
//     // data.variable2 = "hello";
//     console.log(data);
//     // console.log(redisClient.get(NumberOfCars));
   
// });



redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
    // redisClient.GET("NumberOfCars", (err, reply) => {
    //     // if (err) throw err;
    //     console.log(reply);
    // });
    
    
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

