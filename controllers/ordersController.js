const { request, response } = require("express");
const { sequelize } = require("../db/connection");
const { getAmountOfOrders } = require("../helpers/CountProducts");
const { Box } = require("../models/box");
const { Order } = require('../models/order');

const ordersGet = async (req = request, res = response) => {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate);
    let orders = await sequelize.query(`SELECT * FROM Orders WHERE createdAt BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`, {
        model: Order,
        //attributes: {exclude: ['password']},

    });
    console.log(orders);
    orders.forEach((order) => {
        order.dataValues.description = JSON.parse(order.dataValues.description);
    });
    let onlyDescription = [];
    orders.map((order) => {
        onlyDescription.push(order.dataValues.description);
    });
    let newArray = [];
    // onlyDescription.map( (algo,idx)=>{
    //     console.log(algo[idx].length);
    // });

    if (startDate !== endDate) {
        return res.status(200).json(
            {
                onlyDescription,
                caja: '0'
            }
        );
    }
    //TODO: Logic for the caja
    let arraydecajas = await sequelize.query(`SELECT * FROM Boxes WHERE createdAt BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`,{
        model: Box
    });
    //console.log(arraydecajas);
    //console.log(arraydecajas.length);
     if (arraydecajas.length > 1) {
        arraydecajas = arraydecajas[arraydecajas.length-1];
          const {caja} = arraydecajas;
         return res.status(200).json(
             {
                 onlyDescription,
                 caja
             }
         );
        
     }
     if (arraydecajas.length==1) {
        arraydecajas = arraydecajas[0];
        const {caja} = arraydecajas;
        console.log(caja);
       return res.status(200).json(
            {
                onlyDescription,
                caja
            }
        );

     }

}
// const ordersGet = async( req = request, res = response ) => {
//     const orders = await Order.findAll({
//         where:{

//         }
//     });
//     res.status(200).json(
//         orders
//     );
// }

const orderCreate = async (req = request, res = response) => {
    const { description } = req.body;
    const amountOfOrders = await getAmountOfOrders();
    const id = amountOfOrders + 1;
    const createdAt = new Date();
    const updatedAt = new Date();
    console.log(createdAt);

    try {
        const creatingOrders = await Order.create({
            id,
            description,
            createdAt,
            updatedAt
        });
        console.log(creatingOrders);
        res.status(201).json({
            msg: 'Order created successfully',
            creatingOrders
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({ error });
    }
};
// const productEdit = async( req = request, res = response ) => {
//     const {id} = req.params;
//     const { name, price } = req.body;
//     try {
//         const editingProduct = await Product.update({
//             name,
//             price
//         },{
//             where:{
//                 id
//             }
//         }
//         );
//         res.status(201).json({
//             msg: 'Product updated successfully',
//             editingProduct
//         })
//     } catch (error) {
//         res.status(403).json({ error });
//     }
// };
// const productDelete = async( req = request, res = response ) => {
//     const { id } = req.params;
//     try {
//         const productDeleted = await Product.update({
//             state: false
//         },{
//             where:{
//                 id
//             }
//         });
//         res.status(200).json({
//             msg:'Product deleted successfully',
//             productDeleted
//         });
//     } catch (error) {
//         res.status(401).json({ error: error });
//     }
// };
module.exports = {
    ordersGet,
    orderCreate
}