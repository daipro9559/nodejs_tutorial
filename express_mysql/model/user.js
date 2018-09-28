'use strict'
const bcrypt = require('bcrypt');
const bcrypt_promise = require('bcrypt-promise')
const jwt = require('jsonwebtoken');
const CONFIG = require('../conf/config')
const Sequelize = require('sequelize')
const {TE, to}          = require('../service/util');


module.exports = (sequelize) => {
    var userModel = sequelize.define('User', {
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
    userModel.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);
            user.password = hash;
        }
    })

    userModel.prototype.comparePassword = async (pw) => {
        let err, pass;
        if (!this, password) {
            console.log("password is not set")
        }
        [err, pass] = await to(bcrypt_p.compare(pw, this.password))
        if(err) TE(err);
        if(!pass) TE('invalid password')
        if (!pass) console.log("invalid password")
        return this
    }

    userModel.prototype.getJWT = () => {
        let exp_time = parseInt(CONFIG.jwt_expiration)
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: exp_time });
    }


    userModel.prototype.toWeb = function(pw) {
        let json = this.toJSON();
        return json;
    };
    return userModel;
};