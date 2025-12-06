const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners.model');
const bcrypt = require('bcrypt');
const { registerOwner, signoutOwner, loginOwner, getOwner } = require('../controllers/owner.controller')
const Ownerauthmiddleware = require('../middlewares/ownerAuth.middleware')



// router.get('/', (req, res) => {
//     res.send('hiiii this is owner...')
// })


router.get('/owner', getOwner);

router.post('/register', registerOwner);

router.post('/signin', loginOwner);

router.post('/signout', Ownerauthmiddleware, signoutOwner)



module.exports = router;