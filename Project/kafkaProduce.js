// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const simulator = require('./simulator');


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

producer.on("ready", function(arg) {
  console.log(`producer Ariel is ready.`);
  simulator.DataMaker();
});

producer.connect();

module.exports.publish= function(msg)
{ 
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());  //Send to KAFKA
  //producer.disconnect();   
}

