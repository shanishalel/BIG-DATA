const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shani:shani206134033@cluster0.phy1b.mongodb.net/salesDb?retryWrites=true&w=majority";

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
    CreateEvent: function (m) {
       
        //---------choose your db here ------------------
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Project");
            dbo.collection("RoadDB").insertOne(m, function (err, res) {
                if (err) throw err;
                console.log("event has been inserted");
                db.close();
            });
        });

        //---------------------------------------

        // sendMessage(JSON.parse(m.value.toString()));
    },
    DeleteEvent: function (m) {
        console.log('Delete Event: ' + m);
    },
    UpdateEvent: function (m) {
        console.log('Update Event ' + m);
    },
    ReadEvent: function (renderTheView) {
        var sum=0;
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("salesDb");
            dbo.collection("transactions").find({}, { projection: { _id: 0, quantity: 1 } }).toArray(function (err, result) {
                if (err) throw err;
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
       
        //כאן צריך לחשב
       

    }
};

module.exports = Db