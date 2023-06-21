const mongoose = require('mongoose');
const config = require('../_helper/config');
const logger = require('../_helper/logger')

const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    // console.log(errMsg + "\n" + err.stack);
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: config.env === 'development' ? err.stack : {}
    })
}


module.exports = {errorHandler}