const express = require('express');
const { test, registerUser, loginUser } = require('../controllers/UserControllers');

const router = express.Router();

router.get('/test' , test )
router.post('/register', registerUser )
router.post('/login', loginUser)

module.exports = router;