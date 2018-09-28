'use strict'
const { User } = require('../model')
const authService = require('../service/authService')
const { to, ReE, ReS } = require('../service/util')

const create = async function(req, res) {
    var body = req.body
    if (!body.email) {
        return ReE(res, "Please enter email")

    } else {
        var err, user
        [err, user] = await to(authService.createUser(body))
        if (err) return ReE(res, err, 422)
        return ReS(res, { message: 'Successfully created new user', user: user.toWeb(), token: user.getJWT() }, 200)
    }
}
module.exports.create = create

const login = async function(req, res) {
    const body = req.body
    let err, user
    [err, user] = await to(authService.authUser(body))
    if (err) return ReE(res, err, 401)
    var dataResponse ={}
    dataResponse.message="login successfully"
    dataResponse.token = user.getJWT()
    return ReS(res, dataResponse,200)
}
module.exports.login = login