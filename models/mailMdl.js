
const staticObj = require('../config.js').merge_output;
const couchdb = require('nano')(staticObj.couchdb);
const author_db = couchdb.use(staticObj.db_authors);
const students_db =  couchdb.use(staticObj.db_students);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
exports.getAuthorsByMail = async (emails) => {
    let authRes = await author_db.view("ByEmail", "emailToDoc",{keys:emails});   
    let data =[];
    if(authRes.rows.length>0){
        authRes.rows.forEach(doc=>{
            let obj = { ...doc.value };
            data.push(obj);
        })
    }
    return data; 
}


exports.getStudentsList = async () => {
    let studRes = await students_db.view("byAdmin", "allEmailDoc");
    let obj = {};
    if(studRes.rows.length>0){
        studRes.rows.forEach(doc=>{
            obj[doc.value.email] = { ...doc.value };
            
        })
    }
    return obj; 
}