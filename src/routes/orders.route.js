const express =require( 'express');
const db = require('../db.js');
const { literal, Op } =require('sequelize');


const {orders,products,itemorder} = db;
const OrdersHandler = express.Router();

OrdersHandler.get ('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await orders.findOne({where:{id},include:[{model:itemorder,
            include:[products]
        }]});
        if (response) {
            return res.status(200).json(response);
        }
        else{
            return res.status(404).send('error al encontrar la id');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
})
OrdersHandler.get('/',async(req,res)=>{
    try {
        const response = await orders.findAll({include:[{model:itemorder,
            include:[products]
        }]});
        if (!response) {
            res.status(400).send('error')
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.post('/', async (req, res) => {
    let totalAmount = 0;
    const { clientName, createdAt, status, productId, wholSale, delivery, payMethod, employee } = req.body;

    const productList = await products.findAll({ where: { id: productId.map((e) => e.id) } });

    try {
        for (const element of productId) {
            const product = productList.find((product) => product.id === element.id);
            if (product) {
                const wholePrice = product.wholPrice ? product.wholPrice : product.price;
                const precio = wholSale ? wholePrice : product.price;
                totalAmount += element.quantity * precio;
            }
        }
        console.log(totalAmount);
        const response = await orders.create({ clientName, totalAmount, status, createdAt, wholSale, delivery, payMethod,employee });

        for (const element of productId) {
            const product = productList.find((product) => product.id === element.id);
            if (product) {
                const precio = wholSale ? product.wholPrice ?? product.price : product.price;

                if (product.stock >= element.quantity) {
                    await itemorder.create({
                        orderId: response.id,
                        productId: product.id,
                        quantity: element.quantity,
                        unitPrice: precio,
                        totalPrice: element.quantity * precio
                    });

                    await products.update(
                        { stock: product.stock - element.quantity },
                        { where: { id: product.id } }
                    );
                } else {
                    return res.status(400).json({ error: `Not enough stock for product ID: ${product.id}` });
                }
            }
        }

        const fullResponse = await orders.findOne({
            where: { id: response.id },
            include: [{
                model: itemorder,
                include: [products]
            }]
        });

        return res.status(200).json(fullResponse);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



OrdersHandler.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const orden = await orders.findOne({where:{id}});
        if (!orden) {
            return res.status(404).send('orden no encontrada')
        }
        const response = await orders.destroy({where:{id}});
        return res.status(200).send ('orden borrada' + response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.get('/filter/date/:date',async(req,res)=>{
    const {date} = req.params;
    try {
        const response = await orders.findAll({include:[{model:itemorder,
            include:[products]
        }],where:{createdAt:{[Op.gte]:new Date(date + 'T00:00:00'),[Op.lte]:new Date(date + 'T23:59:59')}}})
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.get('/filter/today',async (req, res)=>{
    const today = new Date();
today.setHours(0,0,0,0);
    try {
        const response = await orders.findAll({include:[{model:itemorder,
            include:[products]
        }],where:{createdAt:{[Op.gte]:today}}})
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.get('/filter/yesterday',async(req,res)=>{
    const today = new Date();
        today.setHours(0,0,0,0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);  // Restar 1 día

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);  
    try {
        const response = await orders.findAll({include:[{model:itemorder,
            include:[products]
        }],where:{createdAt:{[Op.gte]:yesterday,[Op.lte]:endOfYesterday}}})
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.get('/filter/lastWeek',async(req,res)=>{
    const today = new Date();
    today.setHours(23,59,59,999);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    try {
        const response = await orders.findAll({include:[{model:itemorder,
            include:[products]
        }],where:{createdAt:{[Op.gte]:lastWeek,[Op.lte]:today}}})
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

OrdersHandler.get('/filter/wholclients',async(_req,res)=>{
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate((today.getDate() - 30 ));
    try {
        const response = await orders.findAll({
            include:[{model:itemorder,
                include:[products]
            }],
            where:{
                createdAt:{[Op.gte]:lastMonth,[Op.lte]:today}
            }
        })
        const clients = response.filter((e)=>e.wholSale === true)
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

module.exports = OrdersHandler;





//con promos 
/**OrdersHandler.post('/',async(req,res)=>{
    let totalAmount = 0;
    const {clientName,createdAt,status,productId,wholSale,delivery,payMethod,newPromotionsId} = req.body;

    const productList = await products.findAll({where:{id:productId.map((e)=>e.id)}});
    
    
    const promotionList =  await promotions.findAll({where:{id:newPromotionsId.map((e)=>e)}});
    console.log(promotionList);
    
    if (newPromotionsId&&newPromotionsId.length > 0) {
        for (const element of promotionList) {
            const promo = promotionList.find((product)=>product.id === element.id);
            totalAmount += element.totalAmount;
            if (promo) {
        
        }
    }
    try {
        for (const element of productId) {
            const product = productList.find((product)=>product.id === element.id);
            const wholePrice =product.wholPrice?product.wholPrice:product.price;
            const precio = wholSale ? wholePrice : product.price;
            if (product) {
                totalAmount += element.quantity * precio;
            }
        }

        const response = await orders.create({clientName,totalAmount,status,createdAt,wholSale,delivery,payMethod});
        if (newPromotionsId&&newPromotionsId.length > 0) {
            await response.addPromotions(newPromotionsId)
        }
        
        for (const element of productId) {  
            const product = productList.find((product)=>product.id === element.id)
            const precio = wholSale ? product.wholPrice??product.price : product.price;
            
            
            if (response && product) {
                const response2 = await itemorder.create({orderId:response.id,productId:product.id,quantity:element.quantity,
                unitPrice:precio,
                totalPrice:element.quantity*precio})
                const update = await products.update({stock : literal(`stock - ${element.quantity}`)},{where:{id:element.id}});
            }; 
        };  


        const fullResponse = await orders.findOne({
            where: { id: response.id },
            include: [{
                model: itemorder, 
                include: [products] 
            },{
                model: promotions, 
                include: [{
                    model: itempromotion, 
                    include: [products] 
                }],
                through: { attributes: [] } 
            }
        ]
        });
            return res.status(200).json(fullResponse );
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}}); */