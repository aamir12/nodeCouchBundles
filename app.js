const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const log4js = require('log4js');
const staticObj = require('./config.js').merge_output;
const {errorHandler} = require('./middlewares/error');
const app = express();



log4js.configure({
  appenders: { AdminModule: { type: 'file', filename: staticObj.logPath } },
  categories: { default: { appenders: ['AdminModule'], level: 'trace' } }
});
const logger = log4js.getLogger('AdminModule');

generateLogs = function (error, msg) {
  switch (error) {
    case "trace":
      logger.trace(msg);
      break;
    case "debug":
      logger.debug(msg);
      break;
    case "info":
      logger.info(msg);
      break;
    case "warn":
      logger.warn(msg);
      break;
    case "error":
      logger.error(msg);
      break;
    case "fatal":
      logger.fatal(msg);
      break;
  }
}

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(path.join(__dirname+"public"+"/")));

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());
app.use('/students/photo', express.static(path.join(__dirname, 'uploads/students')));

app.use(
    session({
      secret: staticObj.SESSION_KEY,
      resave: false,
      saveUninitialized: false
    })
);

app.use(flash());

//send this data to all routes
app.use((req, res, next) => {    
    res.locals.defaultValue = '';
    let errMsg = req.flash('error');
    let succMsg = req.flash('success');
    res.locals.errorMsg = errMsg.length>0?errMsg[0]:null;
    res.locals.successMsg = succMsg.length>0?succMsg[0]:null;
    res.locals.examineerTitle = staticObj.examineerTitle;
    res.locals.dbdocurl =  staticObj.dbUrl; 
    next();
});


const dashRoutes = require('./routes/dashRts');
app.use('/dashboard',dashRoutes);

const requestRoutes = require('./routes/requestRts');
app.use('/request',requestRoutes);

const fileRts = require('./routes/fileRts');
app.use('/fileupload',fileRts);

const mailRts = require('./routes/mailRts');
app.use('/mailsend',mailRts);

const testRts = require('./routes/testRts');
app.use('/test',testRts);

const authRoutes = require('./routes/authRts');
app.use(authRoutes);

app.use(errorHandler);
app.listen(staticObj.PORT,()=>{
    console.log(`Server is running at port:${staticObj.PORT}`);
});