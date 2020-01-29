
const { validationResult } = require('express-validator');
const dashMdl = require('../models/dashMdl');
const requestMdl = require('../models/requestMdl');
const util = require('../utils/functions');
const staticObj = require('../config.js').merge_output;
const asyncHandler = require('../middlewares/async');


exports.getDash = asyncHandler(async (req, res, next) => {   
    res.render('dashboard',{       
        currPageTitle:'Dashboard'
    });
});

exports.getAllNotification = asyncHandler(async (req,res,next) => {
   let total = 0; 
   let newAuthorReq = await requestMdl.authorRequestCounter('pending'); 
   total = total + newAuthorReq;
   res.json({newAuthorReq,total});
});


