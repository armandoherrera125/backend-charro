const express = require('express');
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
const { sequelize } = require('../db/connection');
// const { dbConnection } = require('../database/config');
class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        // this.loginPath = '/auth';
         this.productsPath = '/api/products';
         this.ordersPath = '/api/orders';
         this.boxPath = '/api/box';
        this.db();
        this.middlewares();
         this.routes();

    }

    middlewares(){
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    async db() {

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    routes(){
        this.app.use(this.productsPath, require('../routes/productsRoute'));
        this.app.use(this.ordersPath,require('../routes/ordersRoute'));
        this.app.use(this.boxPath,require('../routes/cajaRoute'));

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });
    }
}
module.exports= Server;