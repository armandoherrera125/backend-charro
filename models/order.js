const { sequelize } = require("../db/connection");
const {Sequelize, DataTypes, Model} = require("sequelize");
const Order = sequelize.define( 'Order', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.NOW
    },
});
module.exports = {
    Order
}