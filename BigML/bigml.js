// ////https://www.npmjs.com/package/bigml

var bigml = require('bigml');
var connection = new bigml.BigML('shanishalel89','8056af838b08e085892d94250e172404ea696b13');

var matrix = [];
for(var i=0; i<5; i++) {
    matrix[i] = [];
    for(var j=0; j<5; j++) {
        matrix[i][j] = 0;
    }
}

const mongo=require('../Mongo/mongo');

// var source = new bigml.Source(connection);
// source.create("../csv_bigml.csv", function(error, sourceInfo) {
//   if (!error && sourceInfo) {
//     var dataset = new bigml.Dataset();
//     dataset.create(sourceInfo, function(error, datasetInfo) {
//       if (!error && datasetInfo) {
//         var model = new bigml.Model();
//         model.create(datasetInfo, function (error, modelInfo) {
//           if (!error && modelInfo) {
//             var prediction = new bigml.Prediction();
//             prediction.create(modelInfo, {"":""})

//           }
//         });
//       }
//     });
//   }
// });



// let csvToJson = require('convert-csv-to-json');
// csvToJson.formatValueByType().getJsonFromCsv(fileInputName);

// let json = csvToJson.formatValueByType().getJsonFromCsv("../csv_bigml.csv");
// console.log(json);

// for(let i=0; i<json.length;i++){

//     console.log(json[i]);    
//     get_predict(json[i])

// } 

module.exports.get_predict=(event) =>{
var localModel = new bigml.LocalModel('model/61085252c1c0000b93094151',connection);
localModel.predict({"CarType":event.CarType,"IsSpecial":event.IsSpecial,"Day":event.Day,"Type":event.Type,"Time":event.Time,"enter_section":event.enter_section },
function(error, prediction) {
    // console.log(prediction.prediction)
   var  pred = parseInt(prediction.prediction)
   console.log(pred)

    if (event.Section==pred)
    {
        matrix[pred-1][pred-1]++;
        // console.log (matrix[pred-1][pred-1]++);
        // console.log(matrix)
    }
});

module.exports.Matrix=matrix;

}








