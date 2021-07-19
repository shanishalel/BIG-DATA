var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

redisClient.subscribe('message'); 

let all_the_cars=new Map();

let section_1=0,section_2=0,section_3=0,section_4=0,section_5=0;
let number_of_cars=0;

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
    let car = JSON.parse(data);
    
    var cars=new Map();
    cars.set("Type",car.Type);
    cars.set("Section",car.Section);
    cars.set("CarType",car.carType);
    cars.set("Day", car.Day);
    cars.set("Time",car.Time);
    cars.set("IsSpecial",car.IsSpecial);

    all_the_cars.set(number_of_cars,cars);
    
    number_of_cars++;


});


exports.get_sections =(req,res,next) => {
    all_the_cars.forEach(car => {
       
    if(car.Type=="Enter Road" || car.Type=="Enter Section"){
        switch(car.Section){
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
    /* at this point we can gets number<0 we should check it ans maybe 
    change the simulator */
    if(car.Type=="End Road" || car.Type=="Exit road"){
        switch(car.Section){
            case 1:
                section_1--;
                break;
            case 2:
                section_2--;
                break;
            case 3:
                section_3--;
                break;
            case 4:
                section_4--;
                break;
            case 5:
                section_5--;
                break;
            default:
        }

    }});

    var number_cars=section_1+section_2+section_3+section_4+section_5;
    var cards=[
        {section:"1",Number:section_1},
        {section:"2",Number:section_2},
        {section:"3",Number:section_3},
        {section:"4",Number:section_4},
        {section:"5",Number:section_5},
        {section:"6",Number:number_cars}];

    res.render('../RT_GUI/views/pages/index',{cards:cards});

};


redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});

server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});


