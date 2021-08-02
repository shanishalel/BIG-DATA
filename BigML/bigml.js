// ////https://www.npmjs.com/package/bigml

var bigml = require('bigml');
var connection = new bigml.BigML('shanishalel89','8056af838b08e085892d94250e172404ea696b13');
// const mongo=require('../Mongo/mongo');

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


function get_predict(event){
var localModel = new bigml.LocalModel('model/6107ef5e47d7751298038790',connection);
localModel.predict({"CarType":event.CarType,"IsSpecial":event.IsSpecial,"Day":event.Day,"Type":event.Type,"Time":event.Time },
function(error, prediction) {console.log(prediction.prediction)});
}







// // var bigml = require('bigml');
// // var connection = new bigml.BigML('SHIRELISR','53bd09869add8361f9db8872ba6d0bae29021873');
//  //const mongo=require('../Mongo/mongo');

// // var source = new bigml.Source();
// //mongo.write_to_csv_mongoDB();
// // source.create("csv_bigml.csv", function(error, sourceInfo) {
// //   if (!error && sourceInfo) {
// //     var dataset = new bigml.Dataset();
// //     dataset.create(sourceInfo, function(error, datasetInfo) {
// //       if (!error && datasetInfo) {
// //         var model = new bigml.Model();
// //         model.create(datasetInfo, function (error, modelInfo) {
// //           if (!error && modelInfo) {
// //             var prediction = new bigml.Prediction();
// //             prediction.create(modelInfo, {'petal length': 1})
// //           }
// //         });
// //       }
// //     });
// //   }
// // });
