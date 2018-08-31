const Sequelize = require('sequelize');

const sequelize = new Sequelize('rest_api_demo', 'root', 'Dainguyen95', {
    host: "localhost",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
module.exports.sequelize = sequelize
// const user = sequelize.define('user', {
//     'id': {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     'name': {
//         type: Sequelize.STRING
//     },
//     'createdAt': {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     },
//     'updatedAt': {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     },
// }, {
//     freezeTableName: true
// })

// exports.findAllUser = function() {
//     return user.findAll()
// }
// exports.createUser = function(name) {
//     return user.create({ name: name, createdAt: Date.now(), updatedAt: Date.now() })
// }