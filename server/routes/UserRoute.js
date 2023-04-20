const express = require('express');

const { test, registerUser, loginUser, protectedRoute } = require('../controllers/UserControllers');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();

router.get('/test' , test )
router.post('/register', registerUser )
router.post('/login', loginUser)
router.get('/protectedroute',  protectedRoute)

module.exports = router;