const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('mysql://root:gOoN3LrneqeMaqTnwwTN@containers-us-west-20.railway.app:5938/railway');

module.exports = {
    sequelize
}
