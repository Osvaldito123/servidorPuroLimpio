const { DataTypes }=require( "sequelize");

module.exports = (sequelize)=>{
    return sequelize.define("promotions",{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            autoIncrement:true,
        },
        totalAmount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
        },
    });
};