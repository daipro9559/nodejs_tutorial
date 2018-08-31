const bcrypt = require('bcrypt');
const bcrypt_promise = require('bcrypt-promise')
const jwt = require('jsonwebtoken');
const CONFIG = require('../conf/config')

module.exports = (sequelize) => {
    var userModel = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email is invalid"
                }
            }
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });

    userModel.prototype.comparePassword = async(pw) => {
        let err, pass;
        if (!this, password) {
            console.log("password is not set");
        }
        [err, pass] = await bcrypt.compare(pw, this.password);
        if (err) console.log(err);
        if (!pass) console.log("invalid password");
        return this;
    }

    userModel.prototype.getJWT() = () => {
        let exp_time = parseInt(CONFIG.jwt_expiration)
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
    }

    return userModel;
};