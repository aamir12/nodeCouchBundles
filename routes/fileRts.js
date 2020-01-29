const express = require('express');
const multer  = require('multer');


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'uploads/students');
    },
    filename: (req, file, cb) => {
      let fileName = new Date().toISOString() + '-' + file.originalname;
      fileName = fileName.replace(/:/g, "-");
      cb(null, fileName);
    }
  });
  
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const fileCtrl = require('../controllers/fileCtrl');
const { auth } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/multersingle',auth,fileCtrl.singlefileuploadtodb);
router.get('/multermulti',auth,fileCtrl.multermulti);
router.get('/singlefiledb',auth,fileCtrl.singlefileuploadtodb);
router.get('/dropzone',auth,fileCtrl.dropzone);

router.post('/sigleFileUploadToFolder',
 auth,
 multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'),fileCtrl.singleFileUploadToFolder);

 router.post('/multipleFileUploadToFolder',
 auth,
 multer({ storage: fileStorage, fileFilter: fileFilter }).array('multiFile',5),fileCtrl.multipleFileUploadToFolder);


router.post('/deleteStud',auth,fileCtrl.deleteStud);
router.post('/downloadDoc',auth,fileCtrl.downloadDoc);

router.post('/postdropzone',auth,
multer({}).any('photos',5),
fileCtrl.postdropzone);

router.get('/getDBDocs/:id/:docname',auth,fileCtrl.getDBDocsUrl);
router.post('/downloadDbDoc/:id/:docname',auth,fileCtrl.downloadDbDoc)

router.get('/base64',auth,fileCtrl.getbase64)
router.post('/uploadWithBase64',auth,fileCtrl.uploadWithBase64);
module.exports = router;

//fileupload/singlefileuploadtodb


