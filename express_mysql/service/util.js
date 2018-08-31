const { to } = require('await-to-js')
const pe = require('parse-error')

module.exports.to = async(promise) => {
    let err, res;
    [err, res] = await to(promise)
    if (err) return [pe(err)]
    return [null, res]
}

//error web response
module.exports.responseErr = (res, err, code) => {
        if (typeof err == 'object' && typeof err.message != 'undefined') {
            err = err.message
        }
        if (typeof code !== 'undefined') {
            res.statusCode = code
        }
        return res.json({ success: false, error: err })
    }
    // success web response 
module.exports.responseSuc = (res, data, code) => {
    let send_data = { success: true }
    if (typeof data == "object") {
        send_data = Object.assign(data, send_data)
    }
    if (typeof code !== 'undefined') res.statusCode = code

    return res.json(send_data)
}