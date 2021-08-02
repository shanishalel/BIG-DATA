const Json2_CSV = require("json2csv").Parser;
const fs = require("fs");
// const ws = fs.createWriteStream("csv_bigml.csv");

function create_CSV(data) {
    const json2_csv = new Json2_CSV({ header : true });
    const csv_data = json2_csv.parse(data);
    fs.writeFile("csv_bigml.csv",csv_data,function(error){
        if(error)
            throw error;
        console.log("Write to csv successfuly!");
    });
}