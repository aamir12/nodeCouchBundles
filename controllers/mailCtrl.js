const { validationResult } = require("express-validator");
const jade = require("jade");
const file = require('fs');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const util = require("../utils/functions");
const staticObj = require("../config.js").merge_output;

var DOMAIN = staticObj.emailServer.domain;
var mailgun = require('mailgun-js')({ apiKey: staticObj.emailServer.apiKey, domain: DOMAIN });
const asyncHandler = require("../middlewares/async");
const mailMdl = require("../models/mailMdl");

exports.singleMail = asyncHandler(async (req, res, next) => {
  let data= ['test@gmail.com','abc@gmail.com','xyz@gmail.com'];
  res.render("mailHandling/singleMail", {
    currPageTitle: "Mail Management",
    data:data
  });
});

exports.sendsiglemail = asyncHandler(async (req, res, next) => {
  var jadeFormat = jade.compileFile(staticObj.mail_temp_path_acceptReq);
  var mail_temp = jadeFormat({
    name: "aamir",
    id: "0125",
    token: "14785sdfsd",
    serverUrl: staticObj.main_server_url
  });

  let transporter = nodemailer.createTransport({
    host: staticObj.domainMail.host,
    port: staticObj.domainMail.port,
    secure: staticObj.domainMail.secure, // true for 465, false for other ports
    auth: {
      user: staticObj.domainMail.email, // generated ethereal user
      pass: staticObj.domainMail.password // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let emailList = ["aamirkhan8878@gmail.com", "webregister88@gmail.com"];
  let info = await transporter.sendMail({
    from: '"From Nodemailer" '+staticObj.domainMail.from, // sender address
    to: req.body.email, // list of receivers
    subject: "Hi Node Developer", // Subject line
    text: "Hello world?", // plain text body
    html: mail_temp
  });

  if (info.messageId) {
    res.json({ status: true });
  } else {
    res.status(404).json({ status: false });
  }
});

exports.multiUserSendMail = asyncHandler(async (req, res, next) => {
  var jadeFormat = jade.compileFile(staticObj.mail_temp_path_acceptReq);
  var mail_temp = jadeFormat({
    name: "aamir",
    id: "0125",
    token: "14785sdfsd",
    serverUrl: staticObj.main_server_url
  });

  let transporter = nodemailer.createTransport({
    host: staticObj.domainMail.host,
    port: staticObj.domainMail.port,
    secure: staticObj.domainMail.secure, // true for 465, false for other ports
    auth: {
      user: staticObj.domainMail.email, // generated ethereal user
      pass: staticObj.domainMail.password // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let emailList = ["aamirkhan8878@gmail.com", "webregister88@gmail.com"];
  let info = await transporter.sendMail({
    from: '"From Nodemailer" '+staticObj.domainMail.from, // sender address
    to: req.body.emails, // list of receivers
    subject: "Hi Node Developer", // Subject line
    text: "Hello world?", // plain text body
    html: mail_temp
  });

  res.json({ status: true });
});

exports.gmailSend = asyncHandler(async (req, res, next) => {
  let str = file.readFileSync("./views/mail_temp/ejsMailTemplate.ejs", "utf8");
  //get html render body
  let mailBody = ejs.render(str, {
    name: "aamir",
    email: req.body.email
  });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
      user: staticObj.gmailSMTP.email,
      pass: staticObj.gmailSMTP.password //setPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: staticObj.gmailSMTP.from, //'<foo@blurdybloop.com>',
    to: "aamirkhan8878@gmail.com",
    subject: "test mail",
    cc: "webregister88@gmail.com",
    html: mailBody,
    replyTo: "aakhan8878@gmail.com",
    tls: {
      rejectUnauthorized: false // tls for offline
    }
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).json({ error: "notSend", msg: error });
    } else {
      res.json({ status: true });
    }
  });
});

exports.mailwithAttachment = asyncHandler(async (req, res, next) => {
     
    // req.files for multiple files
    //req.file for single file
    console.log("mailwithAttachment");
    let attachments = req.files.map(ff=>{
      let obj = {
        filename:ff.originalname,
        content:ff.buffer
        };
      return obj;  
    });

    
    let transporter = nodemailer.createTransport({
      host: staticObj.domainMail.host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: staticObj.domainMail.email, // generated ethereal user
        pass: staticObj.domainMail.password // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    //for single file
    // let mailOptions = {
    //   from: '"From Nodemailer" <support@codexking.com>', // sender address
    //   to: req.body.email, // list of receivers
    //   subject: "Hi Node Developer", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: '<h1>Hello Aamir</h1>',
    //   attachments: [       
    //     {   
    //         filename: req.file.originalname,
    //         content: req.file.buffer
    //     }]

    // }

    //for multiple
    let mailOptions = {
      from: '"From Nodemailer" '+staticObj.domainMail.from, // sender address
      to: req.body.email, // list of receivers
      subject: "Hi Node Developer", // Subject line
      text: "Hello world?", // plain text body
      html: '<h1>Hello Aamir</h1>',
      attachments: attachments
    }

    transporter.sendMail(mailOptions, (error, info) => {    
      if (error) 
          {
            console.log(error);
            res.status(404).json({error:'mailNotSend', msg: 'Unable to send mail right now !'});
          }
          else
          { 
            res.json({status: true});
          }
      });
});

exports.sendWithMailGun = asyncHandler(async (req, res, next) => {  
  
  //https://documentation.mailgun.com/en/latest/user_manual.html#batch-sending
   let rec = await mailMdl.getStudentsList();  
   let to = Object.keys(rec);
   if(to.length>0){
     let todata = to.join(',');     
     let recipientVariables = JSON.stringify(rec);
     
     //recipientVariables
     /*
     '{"alice@example.com": {"first":"Alice", "id":1}, "bob@example.com":{"first":"Bob", "id":2}}'
     */ 

     let msg =  req.body.message.replace(
       /{(\w*)}/g,
        function( m, key ){
           return `%recipient.${key}%`;          
        }
      );

      
      var data = {
        from: staticObj.emailServer.from,
        to: todata,
        subject: 'Hey %recipient.name%',
        html: msg,
            'recipient-variables': recipientVariables
      };
      
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });

      res.json({status:true});
   }else{
     res.status(404).json({error:'mailNotSend',msg:'Mail not send'});
   }



});
