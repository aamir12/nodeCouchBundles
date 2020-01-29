const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res,next) => {
    let error = { ...err };
    error.message = err.message || 'Unknown error !!';
    error.url = error.url || '/dashboard';   
    console.log("Error Handler");
    console.log(err);
   
    let errorcode = 'unknown_err';

    if(err.error=='not_found'){
        errorcode = 'not_found';        
        message = `Resource not found`;
        error = new ErrorResponse(message, 404);        
    }
   

    if(req.xhr || req.headers.accept.indexOf('json') > -1){
        res.status(error.statusCode || 500).json({
            error:errorcode,
            msg: error.message || 'Server Error'
        });

    }else{
        req.flash('error',error.message);
        res.redirect(error.url);        
    }  

  
};

module.exports.errorHandler = errorHandler;

