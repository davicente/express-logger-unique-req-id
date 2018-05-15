const winston = require('winston');
const path = require('path');

const httpContext = require('express-http-context');

exports.initializeLogger = (transports=null) => {
    if(!transports) {
        transports = [
            new winston.transports.File({
            level: 'debug',
            filename: './logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true
            }),
            new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
            })
        ]
    }
    let winstonLogger = new winston.Logger({
        transports,
        exitOnError: false
    });

    winstonLogger.stream = {
        write: function (message, encoding) {
            winstonLogger.info(message);
        }
    };


    // Wrap Winston logger to print reqId in each log
    var formatMessage = function(message) {
        message += httpContext.get('reqId') ? " - reqId: " + httpContext.get('reqId'): "";
        return message;
    };

    var logger = {
        log: function(level, message) {
            winstonLogger.log(level, formatMessage(message));
        },
        error: function(message) {
            winstonLogger.error(formatMessage(message));
        },
        warn: function(message) {
            winstonLogger.warn(formatMessage(message));
        },
        verbose: function(message) {
            winstonLogger.verbose(formatMessage(message));
        },
        info: function(message) {
            winstonLogger.info(formatMessage(message));
        },
        debug: function(message) {
            winstonLogger.debug(formatMessage(message));
        },
        silly: function(message) {
            winstonLogger.silly(formatMessage(message));
        }
    };

    return logger;
};
