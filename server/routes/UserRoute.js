const express = require('express');

const { registerUser, loginUser, manageOnline,  protectedRoute, dbFetchMessages } = require('../controllers/UserControllers');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();

router.post('/register', registerUser )
router.post('/login', loginUser)
router.get('/protectedroute' , jwtAuth , protectedRoute)
router.get('/messages/:userId', jwtAuth , dbFetchMessages)
router.get('/people', jwtAuth , manageOnline);

module.exports = router;