const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('mysql://root:2gECB1AbeHG4-4CdEe1d24A6C2AAhAhg@monorail.proxy.rlwy.net:22247/railway');

module.exports = {
    sequelize
}
