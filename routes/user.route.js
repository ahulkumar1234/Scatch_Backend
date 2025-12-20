const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, logoutUser, getAllUser, checkAuth, profile } = require('../controllers/auth.controller');
const authmiddleware = require('../middlewares/auth.middleware')


router.get('/', getAllUser);

router.get('/profile', checkAuth, profile);

router.get("/me", checkAuth);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/:id', authmiddleware, updateUser);

router.post('/logout', authmiddleware, logoutUser);






module.exports = router;