const express = require('express');
const { auth } = require('../middlewares/authenticate');
const requestCtrl = require('../controllers/requestCtrl');
const router = express.Router();

router.get('/',auth,requestCtrl.manageRequest);
router.post('/acceptRequest',auth,requestCtrl.acceptRequest);
router.post('/rejectRequest',auth,requestCtrl.rejectRequest);
module.exports = router;


