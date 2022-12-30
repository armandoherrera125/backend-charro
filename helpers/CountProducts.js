const { Product } = require("../models/product");
const { Order } = require("../models/order");
const { Box } = require("../models/box");

const getAmountOfProducts = async (  ) => {

    const counter = await Product.count();
    return counter;
};
const getAmountOfOrders = async (  ) => {

    const counter = await Order.count();
    return counter;
};
const getAmountOfBox = async ( ) => {
    const counter = await Box.count();
    return counter;
};

module.exports = {
    getAmountOfProducts,
    getAmountOfOrders,
    getAmountOfBox
}