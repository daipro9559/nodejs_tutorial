const {User} = require('../model')
const authService = require('../service/authService')
const {to,ReE,ReS} = require('../service/util')

var create = async function(req,res){
    var body = req.body;
    if (!body.email){
        return ReE(res,"Please enter email");

    }else{
        let err,user;
        [err,user] = await to()
    }
}