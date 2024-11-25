const server =require( "./src/app.js");
const con =require("./src/db.js");
const  UploadProducts  =require ("./src/utils/uploadProducts.js");
const UploadOrders = require('./src/utils/uploadOrders.js')
  
const { conn } = con;
  conn.sync({ force: true }).then(() => {
    server.listen(4321, () => {
     UploadProducts();
     UploadOrders();
      console.log('Server running at http://localhost:4321/');
    });
});





