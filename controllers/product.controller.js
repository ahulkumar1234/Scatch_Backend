const productModel = require('../models/product.model');


const getAllproducts = async (req, res) => {
    try {
        const allproducts = await productModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'All products fetched succesfully!',
            allproducts,
        });

    } catch (error) {
        res.status(509).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const getOneProducts = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product fetched succesfully!",
            data: product
        })
    } catch (error) {
        res.status(509).json({
            success: false,
            message: error.message
        })
    }
}

const createProduct = async (req, res) => {
    const { title, description, price, category, stock } = req.body
    // const image = req.file

    try {
        if (!title || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }

        const existingProduct = await productModel.findOne({ title });

        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: 'Product already exists!'
            });
        }

        const imageUrl = req.file.path; // Cloudinary returns secure URL here

        const newProduct = await productModel.create({
            title,
            description,
            price,
            category,
            stock,
            image: imageUrl
        });

        res.status(201).json({
            success: true,
            message: 'Product created Successfully',
            product: newProduct,
        });

    } catch (error) {
        // console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        })
    }
}

const updateProduct = async (req, res) => {
    try {

        const productId = req.params.id;
        const { title, description, price, category, stock } = req.body;

        const existingProduct = await productModel.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        if (title) existingProduct.title = title;
        if (description) existingProduct.description = description;
        if (price) existingProduct.price = price;
        if (category) existingProduct.category = category;
        if (stock) existingProduct.stock = stock;

        const updatedProduct = await existingProduct.save();


        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {

        const productId = req.params.id;

        const existingProduct = await productModel.findById(productId);

        if (!existingProduct) {
            f
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        await productModel.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getAllproducts, getOneProducts }