const { request, response } = require("express");
const { sequelize } = require("../db/connection");
const { getAmountOfBox } = require("../helpers/CountProducts");
const { Box } = require("../models/box");
const moment = require("moment/moment");

const cajaCreate = async (req = request, res = response) => {
    const { caja } = req.body;
    const amountOfBox = await getAmountOfBox();
    const id = amountOfBox + 1;

    const time = moment.duration("06:00:00");
    var date = moment();
    date.subtract(time).format();
    console.log(date.format());


    const today = new Date();
    const createdAt = date.format();
    const updatedAt = date.format();
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