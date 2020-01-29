const authMdl = require('../models/authMdl');
const staticObj = require('../config.js').merge_output;

exports.auth = async (req,res,next)=>{
    console.log("Auth checking");
    
    if (req.cookies.adToken) {
      
      try {
        let oAuthAS = Buffer.from(req.cookies.adToken, 'base64').toString('ascii');
        let oauthArray = oAuthAS.split(':');
        let email = oauthArray[0];
        let token = oauthArray[1];
        let check = await authMdl.validateAuthToken(email,token);
       // console.log('Auth '+check);
        if(check){
          req.headers.x_myapp_whoami = email;
          req.headers.x_myapp_token = token;
         return next();
        }else{
           authResponse(req,res,'sessExpr');
        }

      } catch (error) {
        authResponse(req,res);
      } 
      
     return next();

    }else{
        authResponse(req,res);
    }

}

const authResponse = (req,res,sess='notAuth') => {
    let msg = staticObj[sess];    
    if(req.xhr || req.headers.accept.indexOf('json') > -1 ){      
      return res.status(404).json({error:sess,msg:msg});        
    }else{        
        req.flash('error',msg);
        return res.redirect("/");
    }
}