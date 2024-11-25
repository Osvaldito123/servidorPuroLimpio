const express =require("express");
const routes =require('./routes.js');

const bodyParser =require("body-parser");
const morgan =require( "morgan");


require("./db.js");

const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json())
server.set('name', 'api');
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(morgan('dev'));

/*server.use((req, res, next) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  } else {
    console.log('No Body');
  }
  next();
});*/
// Middleware de rutas
server.use('/', routes);

module.exports= server;







