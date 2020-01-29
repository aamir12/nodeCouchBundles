const express = require('express');
const testCtrl = require('../controllers/testCtrl');
const router = express.Router();
router.post('/mailGun',testCtrl.testMailGun);
module.exports = router;




