var SHA256 = require("crypto-js/sha256");
const staticObj = require('../config.js').merge_output;
const couchdb = require('nano')(staticObj.couchdb);
const author_db = couchdb.use(staticObj.db_authors);
//password: createsadmin
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.login = async (email,password)=>{
    let enc_sha256 = SHA256(password);
    let pass = enc_sha256.words[0] + "-" + enc_sha256.words[1] + "-" + enc_sha256.words[2];
    let adData = await this.getAdmin();

    if(adData.admin.email === email && adData.admin.password === pass){
        return true;
    }else{
        return false;
    }
}

exports.getAdmin = async () =>{
    let adData = await author_db.get('00allowed');
    return adData;
}

exports.updateToken = async (token) =>{
    let adData = await this.getAdmin();
    adData.admin.token = token;
    await author_db.insert(adData);
}

exports.validateAuthToken = async (email,token) => {
    let adData = await this.getAdmin();
    if(adData.admin.email === email && adData.admin.token === token){
        return true;
    }else{
        return false;
    }
}


