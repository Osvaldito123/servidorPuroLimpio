const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define('itempromotion', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
  },{
    timestamps: false, 
  });
}
