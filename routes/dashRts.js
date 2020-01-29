const express = require('express');
const dashCtrl = require('../controllers/dashCtrl');
const { auth } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/',auth,dashCtrl.getDash);
router.post('/getAllNotification',auth,dashCtrl.getAllNotification);


module.exports = router;


