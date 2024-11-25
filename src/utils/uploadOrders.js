const db =require("../db.js");
const ordersArray = require('./ordersArray.js');
const {orders} = db;
async function UploadOrders() {
    const response = ordersArray.map(async(element)=>{
        return await orders.create({
         status:element.status,
         clientName:element.clientName,
         employee:element.employee,
         wholSale:element.wholSale,
         createdAt:element.createdAt,
         delivery:element.delivery,
         payMethod:element.payMethod,
         //productId:element.productIda
         totalAmount:100
        })
     })
     return response;
}
module.exports = UploadOrders;