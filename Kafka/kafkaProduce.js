// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה



const mongo = require("../Mongo/mongo");
const bigml_=require('../BigML/bigml');


// Imports
const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const simulator = require('../Simulator/simulator');
const { Db } = require("mongodb");


// Connection details 
const kafkaConf = { 
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "urqvma33",
  "sasl.password": "Vn6M6VlC2XS-oK7zL3QpdEHqse_S6KmU",
  "debug": "generic,broker,security"
};
const prefix = "urqvma33-";
const topic = `${prefix}myTest`;

// const kafkaConf = { 
//   "group.id": "cloudkarafka-example",
//   "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "83ogo9vy",
//   "sasl.password": "bC5z_v2mq409ZlPqxnrKDaJ3KRjq3ZPJ",
//   "debug": "generic,broker,security"
// };

// const prefix = "83ogo9vy-";
// const topic = `${prefix}myTest6`;


// https://medium.com/@jonathanferreira23/how-to-implement-a-bulletproof-kafka-producer-consumer-cycle-with-nodejs-81c58dd79dd3 
// Producer its a message producer (creating message), its the source of the data and from the producer we 
// send the data to the kafka brokers (kafka topics -like queue) , then the kafka brokers send the data
// to kafka consumer . 
const producer = new Kafka.Producer(kafkaConf); // creating kafka producer


// Buffer.alloc() method is used to create a new buffer object of the specified size,
// (buffer object is an object that can store an array of memmory)
const genMessage = m => new Buffer.alloc(m.length,m); // m.length is the size of the buffer

producer.on("ready", function(arg) {
  console.log(`Kafka producer is ready`);
  simulator.DataMaker(); // calling DataMaker() function in simulator file that create random events
});

producer.connect(); // Connecting producer to kafka broker

module.exports.publish = function(msg) { 
  m = JSON.stringify(msg); // JSON.stringify(some object) method converts a JavaScript object to JSON string
  producer.produce(topic, -1, genMessage(m), uuid.v4());  //Send to KAFKA
  
  // //send the data to the mongoDB and write
  const tmp_json_object =JSON.parse(m); //cause the mongo gets json object
  
  console.log(tmp_json_object); 
  mongo.insertEvent_to_mongoDB(tmp_json_object); // insert object to mongoDB
  mongo.write_to_csv_mongoDB();
  bigml_.get_predict(tmp_json_object)



  //producer.disconnect();   
}

