const express = require('express');
const userDb = require('./connect/db');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('passport');
const router = express.Router();
app.use(logger('dev'));
app.use(express.urlencoded());
app.use('/', router);
var bodyParser = require('body-parser')
var methodOverride = require('method-override')


/**
 * error handle
 */

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler)
app.use(test)
    //Passport
app.use(passport.initialize())


function logError(err, req, res, next) {
    console.log(err)
    next(err)
}

function test(err, req, res, next) {
    console.log('request type: ', req.method)
    next()
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}
////////////////////////////////

// app.use('/user/users', (req, res, next) => {
//     console.log("Request type:", req.method);
//     next();
// })

// app.get('/user/users', async(req, res) => {
//     var users = await userDb.findAllUser()
//     res.json(users);
// })
// app.post('/user/create', async(req, res) => {
//     console.log(req.body.name);
//     try {
//         var result = await userDb.createUser(req.body.name);
//         res.json(result);
//     } catch (err) {
//         res.json(err);
//     }
// })

const model = require('./model')
model.sequelize.authenticate().then(() => {
    console.log('conenct db completed')
}).catch(err => {
    console.log(err)
})
model.sequelize.sync()
app.get('/', (req, res) => {
    res.send("welcom to kaopiz!")
})
app.listen(3000, () => {
    console.log("server listenning on port 3000")
})