
const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const mongo=require('./mongo.js');
const redisSender=require('./RedisSender.js');
const redisReciver=require('./RedisReciver.js');

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
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);
//const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});

consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
  // console.log("start");
  console.log(m.value.toString());
  const tmp_json=JSON.parse(m.value.toString()); //cause the mongo gets json
  mongo.CreateEvent(tmp_json);
  redisSender.InsertCar(m.value.toString());
  redisReciver;

});

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