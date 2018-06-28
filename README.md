# Express logger unique request id

Logger that creates a unique id for each express request and prints it at the end of each line. It works with callbacks, promises (async - await).

```
npm install express-logger-unique-req-id --save
```


## Usage

``` js
var express= require('express');
var app = express();

var express_logger = require('express-logger-unique-req-id');

express_logger.initializeLogger(app);
let logger = express_logger.getLogger();

logger.debug('First message');
```

As this library uses node asynchronous and contexts, it's important to assign it to the middleware in the right order. This means, if there are other libraries that uses this characteristics too can affect to the good performance of the library. 
If body-parser library is used, express-logger-unique-req-id library has to be assign to the middleware after body-parser. Other case, the library could have unexpected behaviour. In the rest of cases the general rule is to assign it to the middleware as soon as possible.


## Configure logger

As this library uses [`Winston`](https://github.com/winstonjs/winston) as logger, you can configure the File and the Console transports with the same information as you would use with winston

``` js
var express= require('express');
var app = express();

var express_logger = require('./express-logger-unique-req-id');

//logger configuration
const fileConf = {
    level: 'debug',
    filename: './logs.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true
};

const consoleConf = {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true
};

express_logger.initializeLogger(app, fileConf, consoleConf);
let logger = express_logger.getLogger();

logger.debug('First message');
```

For more info about the logger configuration posibilities: [`Winston`](https://github.com/winstonjs/winston)
