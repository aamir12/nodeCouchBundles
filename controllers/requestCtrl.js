const jade = require("jade");
const requestMdl = require('../models/requestMdl');
const asyncHandler = require('../middlewares/async');
const httpserverreq = require('../httpserverreq');
const staticObj = require('../config.js').merge_output;
const {currUtcDateTime, randomString, randID} = require('../utils/functions');


exports.manageRequest = asyncHandler(async (req,res,next) => {
    let data = await  requestMdl.authorRequest(); 
    res.render('request/manageRequest',{        
      currPageTitle: 'Manage Account Request',
      data:data
    });
});

exports.acceptRequest = asyncHandler(async (req,res,next) => {  
   let authRes = await requestMdl.getDoc(req.body.id);
   if(authRes){
     authRes.requestStatus = 'accepted';
     authRes.request.acceptedDate = currUtcDateTime();
      if(authRes.request.hasOwnProperty('rejectedDate')){
       delete authRes.request.rejectedDate;
      }
      authRes.token = randomString(128, 'aA#');
      //console.log(authRes);
      await requestMdl.createAndUpdate(authRes);

      //set the mail_temp with extra parameters
      var jadeFormat = jade.compileFile(staticObj.mail_temp_path_acceptReq);
      mail_temp = jadeFormat({ name: authRes.fullName, id:authRes._id,token:authRes.token, serverUrl: staticObj.main_server_url });

      var req_type = "send_mail";
      var user_mail_info_02 = new Object;
      //user_mail_info_02.to = 'aakhan@iiserb.ac.in';
      user_mail_info_02.to = authRes.email;
      user_mail_info_02.sub = 'Your request has been accepted on examineer.in';
      user_mail_info_02.body = mail_temp;
      var randomId = randID();

      //============== from http server request =============================
      httpserverreq.httpReq(randomId, req_type,user_mail_info_02, "Accepted request of user " + authRes["email"], function (err, body) {
        if (!err && body.success) {
          if (body.result.length != 0) {
            var status = JSON.parse(body.result)
            if (status.success) {
              console.log('Mail sent');              
              return res.json({status:true});            
            }
            else {
              console.log('unable to send mail sent');
              return res.status(400).json({error:'mail_send_fail',msg:'Request is accepted but mail is not send' });            
            }          
          }
        
        }else {
          return res.status(400).json({error:'mail_send_fail',msg:'Request is accepted but mail is not send' });
        }
      });
      //============== from http server request ends=============================
    }else{
      return res.status(400).json({error:'mail_send_fail',msg:'Request is accepted but mail is not send' });
    }
   
});

exports.rejectRequest = asyncHandler(async (req,res,next) => {   
  
  let authRes = await requestMdl.getDoc(req.body.id);
  if(authRes){
   authRes.requestStatus = 'rejected';

    if(authRes.request.hasOwnProperty('acceptedDate')){
      delete authRes.request.acceptedDate;
    }

    if(authRes.token){
      delete authRes.token;
    }


    authRes.request.rejectedDate = currUtcDateTime();    
    //console.log(authRes);
    await requestMdl.createAndUpdate(authRes);
    //set the mail_temp with extra parameters
    var jadeFormat = jade.compileFile(staticObj.mail_temp_path_rejectReq);
    mail_temp = jadeFormat({ name: authRes.fullName });
    var req_type = "send_mail";
    var user_mail_info_02 = new Object;
    //user_mail_info_02.to = 'aakhan@iiserb.ac.in';
    user_mail_info_02.to = authRes.email;
    user_mail_info_02.sub = 'Your request has been rejected on examineer.in';
    user_mail_info_02.body = mail_temp;
    var randomId = randID();

    //============== from http server request =============================
    httpserverreq.httpReq(randomId, req_type,user_mail_info_02, "Reject request of user " + authRes["email"], function (err, body) {
      if (!err && body.success) {
        if (body.result.length != 0) {
          var status = JSON.parse(body.result)
          if (status.success) {
            console.log('Mail sent');              
            return res.json({status:true});            
          }
          else {
            console.log('unable to send mail sent');
            return res.status(400).json({error:'mail_send_fail',msg:staticObj.mail_send_fail});            
          }          
        }
        
      }else {
        return res.status(400).json({error:'mail_send_fail',msg:staticObj.mail_send_fail});
      }
    });
    //============== from http server request ends=============================
    }else{
     return res.status(400).json({error:'notFound',msg:staticObj.notFound});
    }
  
});



