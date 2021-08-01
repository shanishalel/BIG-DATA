var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

redisClient.subscribe('message'); 

let all_the_cars=new Map();

var cars=[]
var section_1=0,section_2=0,section_3=0,section_4=0,section_5=0;
var number_of_cars=0;

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
    let tmp = JSON.parse(data);
    
    var car=new Map();
    car.set("Type",tmp.Type);
    car.set("Section",tmp.Section);
    car.set("CarType",tmp.CarType);
    car.set("Day", tmp.Day);
    car.set("Time",tmp.Time);
    car.set("IsSpecial",tmp.IsSpecial);

    all_the_cars.set(number_of_cars,car);
    number_of_cars++;


});


exports.get_sections =(req,res,next) => {

    all_the_cars.forEach(car => {

        cars.push(
            {Section : car.get("Section") ,Type:car.get('Type'),CarType:car.get('CarType'),
            Day:car.get('Day'),Time:car.get('Time'),IsSpecial:car.get('IsSpecial') }
        );

        
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
    /* at this point we can gets number<0 we should check it ans maybe 
    change the simulator */
    if(car.get ('Type')=="End Road" || car.get ('Type')=="Exit road"){
        switch(car.get('Section')){
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
        {section:"Section 1",Number:section_1},
        {section:"Section 2",Number:section_2},
        {section:"Section 3",Number:section_3},
        {section:"Section 4",Number:section_4},
        {section:"Section 5",Number:section_5},
        {section:"Total cars : ",Number:number_cars}];


    res.render('../RT_GUI/views/pages/index',{cards:cards,cars:cars});
    

};


redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});

server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});


