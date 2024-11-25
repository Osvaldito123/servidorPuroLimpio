const express =require( 'express');
const db =require('../db.js');
const { where } =require('sequelize');



const {orders,products,promotions,itempromotion} = db;


const promotionHandler = express.Router();

promotionHandler.get('/',async function (req,res) {
try {
    const response =await promotions.findAll({include:[{model:itempromotion,
        include:[products]
    }]});
    if (!response) return res.status(400).send('error');
    return res.status(200).json(response);
} catch (error) {
    return res.status(500).json({error:error.message});
}
});

promotionHandler.post('/',async function (req,res) { const {name,productId,totalAmount} = req.body;
const productList = await products.findAll({where:{id:productId.map((e)=>e.id)}})
    try {
        const Promotion = await promotions.create({name,totalAmount});
        for (const element of productId) {
            const prd = productList.find((e)=>e.id === element.id);
            if (prd && Promotion) {
                const ITEM = await itempromotion.create({
                    promotionId:Promotion.id,productId:prd.id,name:name,
                    quantity : element.quantity
                })     
        }
    }
    const response = await promotions.findOne({where:{id : Promotion.id},
    include:[{
        model:itempromotion,
        include:[products]
    }]
    })
    return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message});
}});





//module.exports = promotionHandler;