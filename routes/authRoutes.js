const express = require('express');
const { userRegister, userLogin, currentUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',userRegister)
router.post('/login',userLogin)

router.get('/current-user',authMiddleware,currentUser)

module.exports = router