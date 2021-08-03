 // -------------------------------------- RedisReciver.js reads data from redis DB --------------------------------
// Imports 
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');

var redisClient = redis.createClient();
var sub = redis.createClient()
redisClient.subscribe('message'); 
const bigml_=require('../BigML/bigml');




let all_the_cars=new Map();
var cars=[]
var section_1 = 0, section_2 = 0, section_3 = 0, section_4 = 0, section_5 = 0, total_cars_number = 0 ;


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


// save car in redis
redisClient.on("message", function (channel, data) {
    let js_object = JSON.parse(data); // // JSON.parse() convert string to JavaScript object 
    
    var single_car=new Map(); // create empty map(key-value) that contain the car deatails
    
    single_car.set("Type",js_object.Type);
    single_car.set("CarType",js_object.CarType);
    single_car.set("Day", js_object.Day);
    single_car.set("Time",js_object.Time);
    single_car.set("IsSpecial",js_object.IsSpecial);
    single_car.set("Section",js_object.Section);


    all_the_cars.set(total_cars_number,single_car);
    total_cars_number++;
    // console.log("Event has been inserted to Redis");   

});


exports.get_sections =(req,res,next) => {
   
    var section_1 = 0, section_2 = 0, section_3 = 0, section_4 = 0, section_5 = 0, total_cars_number = 0 ;

    all_the_cars.forEach(car => {

        cars.push( {
            Type : car.get('Type'),
            CarType : car.get('CarType'),
            Day : car.get('Day'),
            Time : car.get('Time'),
            IsSpecial : car.get('IsSpecial'),
            Section : car.get('Section')

        });
    
    if(car.get ('Type')=="Enter Road" || car.get ('Type')=="Enter Section"){
        switch(car.get('Section')){
            case 1:
                section_1++;
                break;
            case 2:
                section_2++;
                break;
            case 3:
                section_3++;
                break;
            case 4:
                section_4++;
                break;
            case 5:
                section_5++;
                break;
            default:
        }
    }
    });

    var number_cars=section_1+section_2+section_3+section_4+section_5;
    var cards=[
        {section:"Section 1",Number:section_1},
        {section:"Section 2",Number:section_2},
        {section:"Section 3",Number:section_3},
        {section:"Section 4",Number:section_4},
        {section:"Section 5",Number:section_5},
        {section:"Total cars : ",Number:number_cars}];
 

    sections=[section_1,section_2,section_3,section_4,section_5];
    var mat=bigml_.Matrix
    res.render('../RT_GUI/views/pages/index',{cards:cards,cars:cars,sections:sections,mat:mat}); 
    
};



redisClient.on('connect', function() {
    console.log('5. Reciver connected to Redis');
});

server.listen(6061, function() {
    console.log('2. Redis Reciver is running on port 6061');
});


// module.exports=get_sections