var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient()

// for explanations : https://www.sitepoint.com/using-redis-node-js/
let section_1=0,section_2=0,section_3=0,section_4=0,section_5=0;

var Db2 = {
   
    InsertCar: function (m) {
       
        //redisClient.hmset('Cars',m);
        // redisClient.sadd('cars',m, function (err, reply) {
        //     console.log(reply);
        // });
       
        mJson = JSON.parse(m);
        if(mJson.Type=="Enter Road" || mJson.Type=="Enter Section"){
            switch(mJson.Section){
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
        if(mJson.Type=="End Road" || mJson.Type=="Exit road"){
            switch(mJson.Section){
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
   
        }
        redisClient.hmset('Sections', "section_1",section_1+"","section_2",section_2+"","section_3",section_3+"", "section_4",section_4+""
        ,"section_5", section_5+"",function (err, reply) {
                    console.log(reply);
        });
        redisClient.sadd('Cars',m,  function (err, reply) {
            console.log(reply);
        });

    // redisClient.incr('NumberOfCars');
    }



// app.get('/test', function (req, res) {

//     // Store string  
//     redisClient.set('NumberOfCars', "0", function (err, reply) {
//         console.log(reply);
//     });


//     //Store and get Hash i.e. object( as keyvalue pairs)
//     redisClient.hmset('Sections',"one", 'Sorek',"two", 'Nesharim',"three", 'BenShemen', "four",'nashonim',"five", 'kesem');
//     redisClient.hgetall('Sections', function (err, object) {
//         console.log(object);
//     });

    /*
    also ok:
    redisClient.hmset('Sections', {
                        'javascript': 'AngularJS',
                        'css': 'Bootstrap',
                        'node': 'Express'
                        });
    */

// lists : rpush or lpush
/* client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

// -1= get all
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
}); */

//     redisClient.publish("message", "{\"message\":\"Hello from Redis\"}", function () {
//     });

//     res.send('תקשרתי עם רדיס....')
// });

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

};
redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});


module.exports = Db2
