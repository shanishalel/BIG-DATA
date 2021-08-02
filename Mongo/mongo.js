
// Imports
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shani:shani206134033@cluster0.phy1b.mongodb.net/Project?retryWrites=true&w=majority";
// const fastcsv = require("fast-csv");
// const fs = require("fs");//to creat csv
// const ws = fs.createWriteStream("csv_bigml.csv");//npm install fast-csv
// const create_CSV = require('../BigML/create_CSV.js');
// const csv1 = require('./create_CSV');


// sumHelper = function (numbers) {
//     let total = 0;
//     numbers.forEach(numberObject => {
//         let n = parseInt(numberObject.quantity);
//         if (n)
//             total += n;
//     });
   
//     return total;
// }


var Db = {

    // 'CreateEvent' is used for connection to mongoDB and insert object to mongoDB
    insertEvent_to_mongoDB: function (m) {
        //--------- connecting to our DB ------------------
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err)
                throw err;
          
            var dbo = db.db("Project"); // name of the DB
      
            // 'RoadDB' is the name of the collection, 'insertOne' function get document(in oue case Json object)
            //  and insert him to our collection (m is Json object).
            dbo.collection("RoadDB").insertOne(m, function (err, res) {
                if (err)
                    throw err;
                else 
                    // console.log("Event has been inserted to mongoDB");
                db.close();
            });
        }); 
    }, // End 'CreateEvent' (end connection to mongoDB and end insert object to mongoDB)


    // 'DeleteEvent' is used for delete event from mongoDB
    DeleteEvent: function (m) {
        console.log('Delete Event: ' + m);
    }, // End 'insertEvent_to_mongoDB' 


    // 'UpdateEvent' is used for update a given event
    UpdateEvent: function (m) {
        console.log('Update Event ' + m);
    }, // End 'UpdateEvent'



    ReadEvent: function (renderTheView) {
        var sum=0;
                //--------- connecting to our DB ------------------
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

            if (err)
                throw err;

            var dbo = db.db("salesDb");

            dbo.collection("transactions").find({}, { projection: { _id: 0, quantity: 1 } }).toArray(function (err, result) {
                if (err)
                    throw err;
                console.log(result);
                sum = sumHelper(result);
                
                db.close();
                var cardData = {
                    title: "אריאל",
                    totalSum: 1200,
                    percent: 0.8,
                    icon: "work"
                }
                renderTheView(cardData);

            });
        });
    } ,// End 'ReadEvent'


    write_to_csv_mongoDB: function () {
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err)
                throw err;
                // {projection: {IsSpecial:0 }}
            var dbo = db.db("Project");
            dbo.collection("RoadDB").find({}).toArray(function(err, result) {
                if (err) 
                    throw err;
                db.close();
            var delay = 20000;
            setTimeout(function(){create_CSV(result)}
                , delay);

      });
    }); 
 }} // End Db


const Json2_CSV = require("json2csv").Parser;
const fs = require("fs");
const ws = fs.createWriteStream("./csv_bigml.csv");

function create_CSV(data) {
    const json2_csv = new Json2_CSV({ header : true });
    const csv_data = json2_csv.parse(data);
    fs.writeFile("./csv_bigml.csv",csv_data,function(error){
        if(error)
            throw error;
        console.log("Write to csv successfuly!");
    });
}


module.exports = Db // we can use Db in other files 

    


// _dbo.collection("cars").find()
//           .toArray()
//           .then(products => {
//             return products;
//           })
//           .catch(err => {
//             console.log(err);
//           });
