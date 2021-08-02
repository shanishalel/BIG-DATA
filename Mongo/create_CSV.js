const Json2_CSV = require("json2csv").Parser;
const fs = require("fs");
<<<<<<< HEAD:BigML/create_CSV.js
// const ws = fs.createWriteStream("csv_bigml.csv");

function create_CSV(data) {
=======
const ws = fs.createWriteStream('csv_bigml.csv');

function create_csv_mango(data) {
>>>>>>> d4d16ce2fbfbe0bcd988ba7e7693a7cb7395734d:Mongo/create_CSV.js
    const json2_csv = new Json2_CSV({ header : true });
    const csv_data = json2_csv.parse(data);
    fs.writeFile("csv_bigml.csv",csv_data,function(error){
        if(error)
            throw error;
        console.log("Write to csv successfuly!");
    });
}