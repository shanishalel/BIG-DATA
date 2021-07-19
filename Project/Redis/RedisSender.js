var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

// for explanations : https://www.sitepoint.com/using-redis-node-js/

var Db2 = {
   
    InsertCar: function (m) {
        var car = JSON.parse(m);
        redisClient.publish("message",JSON.stringify(car),function(){
        });

    }

};
redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});

module.exports = Db2
