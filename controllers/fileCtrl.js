const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const fileMdl = require('../models/fileMdl');
const util = require('../utils/functions');
const commonDb = require('../utils/commonDb');
const staticObj = require('../config.js').merge_output;
const asyncHandler = require('../middlewares/async');
const couchdb = require('nano')(staticObj.couchdb);
const students_db =  couchdb.use(staticObj.db_students);


exports.singlefileuploadtodb = asyncHandler(async (req, res, next) => {   
    let allstudents = await fileMdl.getAllStudents();
    console.log(JSON.stringify(allstudents,null,2));
    res.render('filehandling/singlefileupload',{       
        currPageTitle:'Multer Single File',
        students:allstudents
    });
});


exports.singleFileUploadToFolder  = asyncHandler(async (req, res, next) => {
   let data = {...req.body,photoName:req.file.filename};   
   let stdData = await fileMdl.createStudent1(data);   
   return res.json({status:true,data:stdData});
});

exports.multipleFileUploadToFolder  = asyncHandler(async (req, res, next) => {
    let documents = [];
    if(req.files.length>0){
        req.files.forEach(file=>{
            documents.push(file.filename);
        })
    }
    let data = {...req.body,documents};   
    console.log(data);    
    let stdData = await fileMdl.createStudent1(data);   
    return res.json({status:true,data:stdData});
 });


exports.deleteStud = asyncHandler(async (req,res,next)=>{
   let id = req.body.id;
   let status = await fileMdl.deleteStudDoc(id);
   if(status){
       res.json({status:true});
   }else{
       res.status(404).json({error:'docNotFound',msg:'Doc not found'});
   }
});

exports.multermulti = asyncHandler(async (req, res, next) => {   
    let allstudents = await fileMdl.getAllStudentsWithDocs();
    console.log(JSON.stringify(allstudents,null,2));
    res.render('filehandling/multermulti',{       
        currPageTitle:'Multer Multiple File',
        students:allstudents
    });
});



exports.downloadDoc = asyncHandler(async (req, res, next) => {   
    console.log(req.body);
    let document = await fileMdl.getDocument(req.body.id,req.body.documentName);
    console.log(document);
    if(document){
        const docPath = path.join('uploads', 'students', document);
        const file = fs.createReadStream(docPath);
        res.setHeader('Content-Type', 'image/jpeg; image/jpg; image/png; ');
        res.setHeader(
        'Content-Disposition',
        'attachment; filename="' + document + '"'
        );
        file.pipe(res);
    }else{
        res.status(404).json({error:'docNotFound',msg:'Document not found'});
    }
});

exports.dropzone  = asyncHandler(async (req, res, next) => {     
    let allstudents = await fileMdl.getAllStudentsWithDbDocs();  
    res.render('filehandling/dropzone',{       
        currPageTitle:'Dropzone',
        students:allstudents    
    });
});

exports.postdropzone  = asyncHandler(async (req, res, next) => {
    var filesArray = [];  
    if(req.files){
        req.files.forEach(function(obj){
            filesArray.push({name:obj.originalname, data: obj.buffer,content_type: obj.mimetype });
        });        
    }
   
    let data = JSON.parse(req.body.data);
    let res1 = await fileMdl.uploadMultiInDB(data,filesArray);
    if(res1){
        res.json({status:true});
    }else{
        res.status({error:'notUpload',msg:'Docs not inserted'});
    }
});


exports.getDBDocsUrl = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    let docname = req.params.docname;
     res.write(`http://localhost:5984/aak_students/${id}/${docname}`);
 });

 exports.downloadDbDoc = asyncHandler(async (req, res, next) => {   
    let id = req.params.id;
    let docname = req.params.docname;
    let filePath = path.join('tempFiles',docname);

    //commonDb.createStdAttachment3(id,docname,filePath,res);

    //let fileData = await fileMdl.downloadDBDOC(id,docname);
    // fs.writeFile(filePath, fileData,function(err){
    //     if(!err){
    //         console.log('Saved!');
    //     }
    // });

    //fileData.pipe(fs.createWriteStream(filePath));
    //fs.writeFileSync(filePath, fileData);

    //commonDb.createStdAttachment(id,docname,filePath);
    // const file = fs.createReadStream(filePath);
    // res.setHeader('Content-Type', 'image/jpeg; image/jpg; image/png; ');
    // res.setHeader(
    //     'Content-Disposition',
    //     'attachment; filename="' + docname + '"'
    // );
    // file.pipe(res);   


    // res.setHeader('Content-Type', 'image/jpeg; image/jpg; image/png;');
    // res.setHeader(
    //     'Content-Disposition',
    //     'attachment; filename="' + docname + '"'
    // );
    // students_db.attachment.getAsStream(id, docname).pipe(res); 
});

exports.getbase64 = asyncHandler(async (req, res, next) => {   
    let allstudents = await fileMdl.getBase64Docs();  
    res.render('filehandling/base64',{       
        currPageTitle:'Base64',
        students:allstudents    
    });
});

exports.uploadWithBase64 = asyncHandler(async (req, res, next) => {   
    let data = req.body;    
    let dbres = await fileMdl.saveBase64Image(data);    
    res.json({status:true});
});




