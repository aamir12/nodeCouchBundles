
const { validationResult } = require('express-validator');
const authMdl = require('../models/authMdl');
const asyncHandler = require('../middlewares/async');
const util = require('../utils/functions');
var staticObj = require('../config.js').merge_output;

exports.getLogin = (req, res, next) => { 
    return res.render('auth/login',{        
        oldInput : {
            email:''
        }
    });
};

exports.postLogin = asyncHandler(async (req,res,next) =>{
    let email = req.body.email;
    let password = req.body.password;
    let httpFlag = staticObj.httpFlag;
    let secureFlag = staticObj.secureFlag;
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            errorMsg: 'Please enter all required fields',
            oldInput: {
              ...req.body
            }
           
        });
    }

    
    let check = await authMdl.login(email,password);
    if(check){
        let token =  util.randomString(128, 'aA#');
        await authMdl.updateToken(token);
        let buffer =  Buffer.from([email, ':',token].join('')).toString('base64');
        let tokenBase64 = buffer.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        res.cookie('adToken', tokenBase64, { maxAge: 3.1536e+10, httpOnly: httpFlag, secure: secureFlag });
        res.redirect("dashboard");
        
    }else{
        res.render('auth/login',{
            errorMsg: 'Invalid Credentials',
            oldInput : {
                ...req.body
            }
        })
    }
    
});


exports.logout = asyncHandler( async (req,res,next) =>{
    await authMdl.updateToken('');
    res.clearCookie("adToken");
    res.redirect('/');
});
