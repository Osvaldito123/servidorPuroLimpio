const express =require( 'express');
const db =require('../db.js');
const { where } =require('sequelize');


const {orders,products,itemorder} = db;

const productsHandler = express.Router();


productsHandler.get('/',async(req,res)=>{
    try {
        const response = await products.findAll();
        const ordered = response.sort((a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        if (!response) {
            res.status(400).send('error')
        }
       // console.log(ordered);
        
        return res.status(200).json(ordered);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});
productsHandler.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const response = await products.findOne({where:{id}});
        if (!response) {
            return res.status(404).send('producto no encontrado')
        }
            return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

productsHandler.post('/',async(req,res)=>{
    const {id,brand,name,category,price,stock,wholPrice,codeBar} = req.body;
    try {
        const response = await products.create({id,brand,name,category,price,stock,wholPrice,codeBar});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

productsHandler.put('/:id',async (req,res)=>{
    const {id}= req.params;
    const {brand,name,category,price,wholPrice,stock} =req.body;
    try {
        const product = await products.findOne({where:{id}})
        if (!product) {
            return res.status(404).send('producto no encontrado')
        }
        const response = await products.update(
            { brand, name, category, price, wholPrice, stock }, 
            { where: { id } } 
          );
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

productsHandler.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const producto = await products.findOne({where:{id}});
        if (!producto) {
            return res.status(404).send('producto no encontrado')
        }
        const response = await products.destroy({where:{id}});
        return res.status(200).send('producto eliminado' + response)
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});


module.exports = productsHandler;