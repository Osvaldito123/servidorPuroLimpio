const db =require("../db.js");
const  api = require("./productsArray.js");

const {products} = db;

 async function UploadProducts() {
    const response = api.map(async(element)=>{
       return await products.create({
        brand:element.brand,
        name:element.name,
        category:element.category,
        price:element.price,
        stock:element.stock,
        wholPrice:element.wholPrice,
        codeBar:element.codeBar
       })
    })
    return response;
};


module.exports = UploadProducts;
