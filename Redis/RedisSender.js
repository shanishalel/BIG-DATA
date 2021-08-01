// -------------------------------------- RedisSender.js saves data in redis DB --------------------------------

// Imports
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');

// for explanations : https://www.sitepoint.com/using-redis-node-js/
var redisClient = redis.createClient(); //creates a new client
var sub = redis.createClient()



// Db2 is object that send data to redis (not save in) 
var Db2 = {
    send_data_to_redisClient: function (m) {
        var car = JSON.parse(m); // JSON.parse() parse string to JavaScript object 
        jsonString = JSON.stringify(car) // JSON.stringify(object) method converts a JavaScript object to JSON string
        redisClient.publish("message",jsonString,function(){}); // send the data to redisClient
    }
};


// when the client connected to Redis
redisClient.on('connect', function () {
    console.log('4. Sender connected to Redis');
});

server.listen(6062, function () {
    //console.log('Sender is running on port 6062');
    console.log('\n1. Redis Sender is running on port 6062');
});

module.exports = Db2 // we can use Db2 in other files 
