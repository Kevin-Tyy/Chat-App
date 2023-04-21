const express = require('express');

const { registerUser, loginUser, protectedRoute } = require('../controllers/UserControllers');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();

router.post('/register', registerUser )
router.post('/login', loginUser)
router.get('/protectedroute' , jwtAuth , protectedRoute)

module.exports = router;