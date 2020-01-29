var SHA256 = require("crypto-js/sha256");
const staticObj = require('../config.js').merge_output;
const couchdb = require('nano')(staticObj.couchdb);
const author_db = couchdb.use(staticObj.db_authors);
//password: createsadmin
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.authorRequest = async () => {
    let authRes = await author_db.view("byAdmin", "request");   
    let data = {
        pending:[],
        rejected:[],
        accepted:[]
    }

    if(authRes.rows.length>0){
        authRes.rows.forEach(doc=>{
            if(doc.value.requestStatus=="pending"){
              data.pending.push(doc.value);
            }
            if(doc.value.requestStatus=="accepted"){
                data.accepted.push(doc.value);
            }
            if(doc.value.requestStatus=="rejected"){
                data.rejected.push(doc.value);
            }
        })
    }
    return data; 
}

exports.authorRequestCounter = async (reqType) => {
  let allReq = 0;
  let counterRes = await  author_db.view('byAdmin', 'requestCounter',{ key:reqType, reduce: true});  
  if(counterRes.rows.length>0){    
    allReq = counterRes.rows[0].value;
  }
  return allReq;
}

exports.getDoc = async (docId) => {
  let doc = false;
  let docRes = await  author_db.get(docId);
  if(docRes){
    doc = docRes;
  }
  return doc;
}

exports.createAndUpdate = async (doc) => {
  let data = await author_db.insert(doc);
  return data;
}




