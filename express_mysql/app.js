const express = require('express');
const userDb = require('./connect/db');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('passport');
app.use(logger('dev'));
app.use(express.urlencoded());
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
const v1    = require('./routes/v1');
const CONFIG = require('./config/config');


console.log(CONFIG.db_name)

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
//DATABASE
const models = require("./model");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err=>{
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err)
})
models.sequelize.sync()
app.use(cors())
// use route
app.use('/v1',v1)

app.listen(3000, () => {
    console.log("server listenning on port 3000")
})