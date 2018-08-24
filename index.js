'use strict';

const uuidv1 = require('uuid/v1');
const httpContext = require('express-http-context');
const loggerBuilder = require('./lib/logger');
let logger;


const getLogger = () => {
    return logger;
};


const initializeLogger = (app = null, fileConf = null, consoleConf = null) => {
		if(app) {
				app.use(httpContext.middleware);

				// Run the context for each request. Assign a unique identifier to each request
				app.use(function(req, res, next) {
						httpContext.set('reqId', uuidv1());
						next();
				});
		}

    logger = loggerBuilder.initializeLogger(fileConf, consoleConf);
};


module.exports = {
    initializeLogger,
    getLogger
};
