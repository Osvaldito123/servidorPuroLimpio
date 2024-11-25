const { DataTypes }=require( "sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("orders",{
        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        employee:{
          type:DataTypes.STRING,
          allowNull:false
        },
        clientName:{
            type:DataTypes.STRING
        },
        payMethod:{
            type:DataTypes.STRING,
            defaultValue:'Efectivo',
            allowNull:false
        },
        delivery:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        },
        wholSale:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        },
        totalAmount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING,
            
        },
    });
};