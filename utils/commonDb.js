const fs = require('fs');
const staticObj = require('../config.js').merge_output;
const couchdb = require('nano')(staticObj.couchdb);
const students_db =  couchdb.use(staticObj.db_students);

exports.createStdAttachment = async (id,docname,docnamePath) => {
  await  students_db.attachment.getAsStream(id, docname).pipe(fs.createWriteStream(docnamePath)); 
}


exports.createStdAttachment2 = async (id,docname,docnamePath,res) => {
  students_db.attachment.get(id, docname).then( (fileData)=>{
    console.log(fileData);
    fs.writeFile(docnamePath, fileData,function(err){
      if(!err){
        console.log('Saved!');
      }
    });
  });
}

exports.createStdAttachment3 = async (id,docname,docnamePath,res) => {
 // res.setHeader('Content-Type', 'image/jpeg; image/jpg; image/png; ');
  res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + docname + '"'
  );
  
  students_db.attachment.getAsStream(id, docname).pipe(res); 
}