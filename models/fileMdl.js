const fs = require('fs');
const staticObj = require('../config.js').merge_output;
const couchdb = require('nano')(staticObj.couchdb);
const students_db =  couchdb.use(staticObj.db_students);

exports.createStudent1 = async (data) => {
    let newId = await this.createDocId();
    data = {...data,_id:newId};
    await students_db.insert(data);
    return data;
}

exports.createDocId = async () => {
    let studRes = await students_db.view("byAdmin", "getAvailableId",{reduce: true});  
    let num = null;
    if(studRes.rows.length>0){
        let maxId = studRes.rows[0].value;
        if(maxId < 0){
          num = -maxId;
        }else{
          num = maxId + 1
        }

    }else{
        num = 1;
    }

    let availableId = "0000".concat(num.toString(36)).slice(-5);
    return availableId;
}

exports.getAllStudents = async () =>{
    let studsRes = await students_db.view("byAdmin", "withPhotoName");
    let alldoc= []
    if(studsRes.rows.length>0){
        studsRes.rows.forEach((doc) => {  
            alldoc.push(doc.value);        
        });
    }
    return alldoc;
}

exports.getAllStudentsWithDocs = async () =>{
    let studsRes = await students_db.view("byAdmin", "withDocuments");
    let alldoc= []
    if(studsRes.rows.length>0){
        studsRes.rows.forEach((doc) => {  
            alldoc.push(doc.value);        
        });
    }
    return alldoc;
}

exports.getAllStudentsWithDbDocs = async () =>{
    let studsRes = await students_db.view("byAdmin", "byAttachment");
    let alldoc= []
    if(studsRes.rows.length>0){
        studsRes.rows.forEach((doc) => {  
            alldoc.push(doc.value);        
        });
    }
    return alldoc;
}

exports.getSingleDoc = async (id) => {
   let studRes = await students_db.get(id);   
   return studRes?studRes:false;
}


exports.deleteStudDoc = async (id) => {
    let doc = await this.getSingleDoc(id);
    console.log(doc);
    if(doc){
      await students_db.destroy(doc._id, doc._rev);
      if(doc.photoName){
        let filePath = 'uploads/students/'+doc.photoName;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);           
        }
      }

      if(doc.documents){
        let total = doc.documents.length;
        for(let i =0 ; i<total;i++){
            let filePath = 'uploads/students/'+doc.documents[i];
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);           
            }
        }  
      }

      return true;
    }else{
      return false;
    }
}

exports.getDocument = async (id,documentName) => {
    
    let studRes = await students_db.view("byAdmin", "downloadDoc",{key:[id,documentName]}); 
    console.log(studRes) ;
    if(studRes.rows.length>0){
       return studRes.rows[0].value;
    }
    return false;
}

exports.uploadMultiInDB = async (data,filesArray) => {
  let availableId = await this.createDocId();
  let res = await  students_db.multipart.insert(data, filesArray, availableId);
  return res;
}

exports.getDBDocs = async (id,docname) => {
    let data = await students_db.attachment.get(id, docname);    
    return data;
}

exports.downloadDBDOC = async (id,docname) => {
    let stream  = await students_db.attachment.get(id, docname);
    return stream;   
}

exports.saveBase64Image = async (data) => {
    let _id = await this.createDocId();
    data = {_id,...data};
    return await students_db.insert(data);
}


exports.getBase64Docs = async () => {
    let studsRes = await students_db.view("byAdmin", "base64Image"); 
    let alldoc= []
    if(studsRes.rows.length>0){
        studsRes.rows.forEach((doc) => {  
            alldoc.push(doc.value);        
        });
    }
    return alldoc;
}
  