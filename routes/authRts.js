const express = require('express');
const { check, body } = require('express-validator');
const authCtrl = require('../controllers/authCtrl');
const { auth } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/',authCtrl.getLogin);
router.post('/',[    
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Please enter password.')
      .isLength({ min: 1 })     
      .trim()
  ],authCtrl.postLogin);

router.get('/logout', auth, authCtrl.logout);

module.exports = router;


