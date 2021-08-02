// Imporsts 
const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const mongo=require('../Mongo/mongo');
const redisSender=require('../Redis/RedisSender');
const redisReciver=require('../Redis/RedisReciver');




const kafkaConf = { 
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "83ogo9vy",
  "sasl.password": "bC5z_v2mq409ZlPqxnrKDaJ3KRjq3ZPJ",
  "debug": "generic,broker,security"
};

const prefix = "83ogo9vy-";
const topic = `${prefix}myTest6`;





// Connection details 
// const kafkaConf = { 
//   "group.id": "cloudkarafka-example",
//   "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "urqvma33",
//   "sasl.password": "Vn6M6VlC2XS-oK7zL3QpdEHqse_S6KmU",
//   "debug": "generic,broker,security"
// };

// const prefix = "urqvma33-";
// const topic = `${prefix}myTest`;



const producer = new Kafka.Producer(kafkaConf); // creating kafka producer
const genMessage = m => new Buffer.alloc(m.length,m);
const topics = [topic];

//  Consumers read messages from Kafka topics by subscribing(מנוי) to topic partitions
const consumer =new Kafka.KafkaConsumer(kafkaConf,{"auto.offset.reset": "beginning"});// creating kafka consumer

consumer.on("error", function(err) {
  console.error(err);
});

consumer.on("ready", function(arg) {
  console.log(`Kafka Consumer is ready`);
  consumer.subscribe(topics); // the consumer can read messages only from the given topics using subscribe function 
  consumer.consume();
});


consumer.on("data", function(m) {
  // When receiving data from a web server, the data is always a string.
  // JSON.parse() parse the data to JavaScript object (he get string and become it to JavaScript object).
  const tmp_json_object =JSON.parse(m.value.toString()); //cause the mongo gets json object
  
  console.log(m.value.toString()); 
  mongo.insertEvent_to_mongoDB(tmp_json_object); // insert object to mongoDB
  mongo.write_to_csv_mongoDB();
  redisSender.send_data_to_redisClient(m.value.toString()); 
  redisReciver; // save data in redis and get the data from redis DB

});


// // print to the console the data that the consume got from the produce
// consumer.on("data", function(m) {
//   console.log(m.value.toString()); 
// });

consumer.on("disconnected", function(arg) {
  process.exit();
});

consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});

consumer.on('event.log', function(log) {
  // console.log("event");
  // console.log(log);
});

consumer.connect();