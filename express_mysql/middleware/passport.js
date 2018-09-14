const passportJwt = require('passport-jwt')
const { User } = require('../model')
const CONFIG = require('../config/config')
const { to } = require('../service/util')
const JWTStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
module.exports = (passport) => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = 'euqwdnscn12390asd'
    passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
        let err, user
        [err, user] = await to(User.findById(jwt_payload.user_id))
        if (err) return done(err, false)
        if (user) return done(null, user)
        else return done(null, false)
    }))
}