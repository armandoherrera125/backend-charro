const { sequelize } = require("../db/connection");
const {Sequelize, DataTypes, Model} = require("sequelize");
const Box = sequelize.define( 'Box', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    caja:{
        type: DataTypes.STRING,
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
    Box
}