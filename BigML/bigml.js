//https://www.npmjs.com/package/bigml
const mongo=require('../Mongo/mongo');
var bigml = require('bigml');
var source = new bigml.Source();
source.create('data.csv', function(error, sourceInfo) {
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