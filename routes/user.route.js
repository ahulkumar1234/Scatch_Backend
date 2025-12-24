const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, logoutUser, getAllUser, checkAuth, profile, uploadProfile, deleteUser } = require('../controllers/auth.controller');
const authmiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/UserProfile.multer');


router.get('/', getAllUser);

router.get('/profile', checkAuth, profile);

router.post('/upload', authmiddleware, upload.single('image'), uploadProfile)

router.get("/me", checkAuth);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/:id', authmiddleware, updateUser);

router.post('/logout', authmiddleware, logoutUser);

router.delete('/remove', authmiddleware, deleteUser)






module.exports = router;