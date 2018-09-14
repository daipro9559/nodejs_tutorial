const {User} = require('../model')
const authService = require('../service/authService')
const {to,ReE,ReS} = require('../service/util')

const create = async function(req,res){
    var body = req.body;
    if (!body.email){
        return ReE(res,"Please enter email");

    }else{
        let err,user;
        [err,user] = await to(authService.createUser(body))
        if (err) return ReE(res,err,422)
        return ReS(res,{message:'Successfully created new user',user:user.toWeb(),token:user.user.getJWT()},200)
    }
}
module.exports.create = create

const login = async function(req,res){
    const body = req.body
    let err,user
    [err,user] = await to (authService.authUser())
    if (err) return ReE(res,err,401)
    return ReS(res,{token:user.getJWT(),user:user.toWeb()})
}
module.exports.login = login