const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllproducts } = require('../controllers/product.controller');
const upload = require('../middlewares/upload.multer');
const router = express();


router.get('/all', getAllproducts)

router.post('/create', upload.single('image'), createProduct)

router.put('/update/:id', updateProduct)

router.delete('/delete/:id', deleteProduct)


module.exports = router;