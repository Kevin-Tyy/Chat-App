const express = require('express');
const { test, registerUser } = require('../controllers/UserControllers');

const router = express.Router();

router.get('/test' , test )
router.post('/register', registerUser )

module.exports = router;