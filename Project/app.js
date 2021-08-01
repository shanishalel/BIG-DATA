const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000



//------------ kafka------------
const kafka_produce = require('./Kafka/kafkaProduce');
const kafka_consume = require('./Kafka/kafkaConsume');

const Router=require('./Routers/cards');

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));

app.use(Router);

// app.use('/fetch',adminRoutes.fetchAll);

app.get('/send', (req, res) => res.render('sender'));

server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));

app.use(express.static('./RT_GUI/public'));
app.set('view engine', 'ejs');

app.get('/dashboard', (req, res) => {
  res.render("./RT_GUI/views/pages/index.ejs",{cards:cards});
});
