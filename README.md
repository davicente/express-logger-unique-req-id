# Express logger unique request id

Logger that creates a unique id for each express request and prints it at the end of each line. It works with callbacks, promises (async - await).

```
npm install express-logger-unique-req-id --save
```


## Usage

``` js
var express= require('express');
var app = express();

var express_logger = require('./express-logger-unique-req-id');

express_logger.initializeLogger(app);
let logger = express_logger.getLogger();

logger.debug('First message');
```


## Configure logger

As this library uses [`Winston`](https://github.com/winstonjs/winston) as logger, you can configure it with an array similar to the ones use with Winston:

``` js
var express= require('express');
var app = express();

var express_logger = require('./express-logger-unique-req-id');

//logger configuration
const winston = require('winston');
let transports = [
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
];

express_logger.initializeLogger(app, transports);
let logger = express_logger.getLogger();

logger.debug('First message');
```

For more info about the logger configuration posibilities: [`Winston`](https://github.com/winstonjs/winston)
