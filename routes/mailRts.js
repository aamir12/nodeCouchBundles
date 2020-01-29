const express = require('express');
const multer  = require('multer');
const upload = multer();
const mailCtrl = require('../controllers/mailCtrl');
const { auth } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/mailManage',auth,mailCtrl.singleMail);
router.post('/sendsiglemail',auth,mailCtrl.sendsiglemail); // mail by domain
router.post('/multiUserSendMail',auth,mailCtrl.multiUserSendMail); //mail by domain
router.post('/gmailsend',auth,mailCtrl.gmailSend); //gmail smtp
router.post('/mailwithAttachment',auth,upload.array('mailAttchFile'),mailCtrl.mailwithAttachment); //mail attachment

router.post('/mailGun',auth, mailCtrl.sendWithMailGun);
module.exports = router;




