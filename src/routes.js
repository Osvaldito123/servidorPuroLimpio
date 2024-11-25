const { Router } = require("express");
const productsRouter = require("./routes/products.route.js");
const OrdersHandler = require("./routes/orders.route.js");
//const promotionHandler = require("./routes/promotions.route.js");

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', OrdersHandler);
//router.use('/promotions',promotionHandler);

module.exports = router; // Exportación en CommonJS
