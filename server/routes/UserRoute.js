const express = require('express');

const { registerUser, loginUser, protectedRoute } = require('../controllers/UserControllers');
const jwtAuth  = require('../middlewares/jwtAuth');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/register', registerUser )
router.post('/login', loginUser)
router.get('/dashroute' , checkToken , protectedRoute)

module.exports = router;