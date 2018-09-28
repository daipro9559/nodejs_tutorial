const { User } = require('../model')
const validator = require('validator')
const { to, TE } = require('../service/util')


const createUser = async(userInfo) => {
    let email, auth_info, err
    auth_info = {}
    auth_info.status = 'create'
    email = userInfo.email
    if (!email) TE('An email or phone number was not entered.');
    if (validator.isEmail(email)) {
        let user
        [err, user] = await to(User.create(userInfo))
        if (err) TE('user already exists with that email');
        return user
    }
}
module.exports.createUser = createUser

const authUser = async function(userInfo) {
    console.log(userInfo.email)
    if (!userInfo.email) TE('Please enter email to login')
    if (!userInfo.password) TE('Please enter password to login')
    let user;
    [err, user] = await to(User.findOne({ where: { email: userInfo.email } }))
    if (!user) TE(err)
    user = user.comparePassword(userInfo.password)
    if (err) TE(err.message)
    return user
}
module.exports.authUser = authUser