const { request, response } = require("express");
const { sequelize } = require("../db/connection");
const { getAmountOfBox } = require("../helpers/CountProducts");
const { Box } = require("../models/box");

const cajaCreate = async (req = request, res = response) => {
    const { caja } = req.body;
    const amountOfBox = await getAmountOfBox();
    const id = amountOfBox + 1;
    const today = new Date();
    const createdAt = today.toLocaleString();
    const updatedAt = today.toLocaleString();
    try {
        const creatingBox = await Box.create({
            id,
            caja,
            createdAt,
            updatedAt
        });
        console.log(creatingBox);
        res.status(201).json({
            msg: 'Box created successfully',
            creatingBox
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({ error });
    }
};

module.exports = {
    cajaCreate
}