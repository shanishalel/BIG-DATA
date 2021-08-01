//https://www.npmjs.com/package/bigml
connection = new bigml.BigML('SHIRELISR',
                             '53bd09869add8361f9db8872ba6d0bae29021873',
                             true)
const mongo=require('../Mongo/mongo');

var bigml = require('bigml');
var source = new bigml.Source();
source.create(mango.write_to_csv_mongoDB(), function(error, sourceInfo) {
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