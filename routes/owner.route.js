const express = require('express');
const router = express.Router();
const { registerOwner, signoutOwner, loginOwner, getOwner, checkOwnerAuth } = require('../controllers/owner.controller')
const Ownerauthmiddleware = require('../middlewares/ownerAuth.middleware')



// router.get('/', (req, res) => {
//     res.send('hiiii this is owner...')
// })



router.get('/owner', getOwner);

router.get('/ownerauth', checkOwnerAuth)

router.post('/register', registerOwner);

router.post('/signin', loginOwner);

router.post('/signout', Ownerauthmiddleware, signoutOwner)



module.exports = router;