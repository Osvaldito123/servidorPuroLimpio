const Products = require('./models/products.js');
const ItemOrder = require('./models/itemOrder.js');
const Orders = require('./models/orders.js');
//const Promotions = require('./models/promotion.js');
//const ItemPromotion = require('./models/itemPromotion.js');
const dotenv = require('dotenv');
require('dotenv').config(); // Este comentario se puede dejar así si ya se llama a dotenv.config() más abajo
const { Sequelize } = require('sequelize');
//const { PostgresDialect } = require('@sequelize/postgres');
//const { Sequelize } =require( '@sequelize/core');


// const fs = require('fs'); // Puedes dejar estos comentarios si no se utilizan
//  const path = require('path'); // Puedes dejar estos comentarios si no se utilizan

dotenv.config();
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
} = process.env;

/**const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'osvaldo',
  user: 'postgres',
  password: 'facu',
  host:'localhost',
  port: 5432,
  ssl: true,
  //clientMinMessages: 'notice',
});  */

const sequelize = new Sequelize(`postgres://${'postgres'}:${'facu'}@${'localhost'}/osvaldo`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});  

Products(sequelize);
ItemOrder(sequelize);
Orders(sequelize);
//Promotions(sequelize);
//ItemPromotion(sequelize);
const { products, itemorder, orders } = sequelize.models;


//relacion de ordenes promociones

// orders.belongsToMany(promotions, {
//   through: 'OrderPromotions', // Nombre de la tabla intermedia
//   foreignKey: 'orderId', // Clave foránea en la tabla intermedia que apunta a "orders"
//   otherKey: 'promotionId' // Clave foránea en la tabla intermedia que apunta a "promotions"
// });
// promotions.belongsToMany(orders, {
//   through: 'OrderPromotions', 
//   foreignKey: 'promotionId', 
//   otherKey: 'orderId' 
// });
//relacion de ordenes-itemordenes
orders.hasMany(itemorder, {
  foreignKey: 'orderId',
  sourceKey: 'id'
});

itemorder.belongsTo(orders, {
  foreignKey: 'orderId',
  targetKey: 'id' 
});
//relacion de promociones y itemPromociones
// promotions.hasMany(itempromotion,{
//   foreignKey: 'promotionId',
// });
// itempromotion.belongsTo(promotions,{
//   foreignKey: 'promotionId',
//   sourceKey: 'id'
// });
//relacion de productos-itempromotion
// products.hasMany(itempromotion, {
//   foreignKey: 'productId',
//   sourceKey: 'id'
// });

// itempromotion.belongsTo(products, {
//   foreignKey: 'productId',
//   targetKey: 'id'
// });
//relacion de productos-itemOrders
products.hasMany(itemorder, {
  foreignKey: 'productId',
  sourceKey: 'id'
});

itemorder.belongsTo(products, {
  foreignKey: 'productId',
  targetKey: 'id'
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
