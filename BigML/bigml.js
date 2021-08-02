//https://www.npmjs.com/package/bigml

<<<<<<< HEAD
var bigml = require('bigml');
var connection = new bigml.BigML('shirelisr','53bd09869add8361f9db8872ba6d0bae29021873');
const mongo=require('../Mongo/mongo');

var source = new bigml.Source();
source.create("csv_bigml.csv", function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset();
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model();
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction();
            prediction.create(modelInfo, {'petal length': 1})
          }
        });
      }
    });
  }
});
=======
// var bigml = require('bigml');
// var connection = new bigml.BigML('SHIRELISR','53bd09869add8361f9db8872ba6d0bae29021873');
 //const mongo=require('../Mongo/mongo');

// var source = new bigml.Source();
//mongo.write_to_csv_mongoDB();
// source.create("csv_bigml.csv", function(error, sourceInfo) {
//   if (!error && sourceInfo) {
//     var dataset = new bigml.Dataset();
//     dataset.create(sourceInfo, function(error, datasetInfo) {
//       if (!error && datasetInfo) {
//         var model = new bigml.Model();
//         model.create(datasetInfo, function (error, modelInfo) {
//           if (!error && modelInfo) {
//             var prediction = new bigml.Prediction();
//             prediction.create(modelInfo, {'petal length': 1})
//           }
//         });
//       }
//     });
//   }
// });
>>>>>>> d4d16ce2fbfbe0bcd988ba7e7693a7cb7395734d
