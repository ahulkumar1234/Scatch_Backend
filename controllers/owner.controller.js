const ownerModel = require('../models/owners.model');
const generateToken = require('../configs/envVariables')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getOwner = async (req, res) => {
    try {
        const owner = await ownerModel.find()
        res.status(200).json({
            success: true,
            message: 'Owner fetched succesfully!',
            owner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const registerOwner = async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res.status(400).json({
            message: "You dont have permission to create owner",
        });
    }

    let { fullname, email, password } = req.body;

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    let CreatedOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword,
    });

    // Token generation
    const Ownertoken = jwt.sign({ email, id: CreatedOwner._id },
        generateToken.accessToken, {
        expiresIn: '1d',
    });

    res.cookie('Ownertoken', Ownertoken<{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })


    res.status(200).json({
        message: "Owner created succefully",
        Owner: CreatedOwner,
    });
}

const loginOwner = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields required',
        })
    }

    const findOwner = await ownerModel.findOne({ email });

    if (!findOwner) {
        return res.status(404).json({
            success: false,
            message: 'Owner with email not found',
        })
    }

    const verifyPass = await bcrypt.compare(password, findOwner.password)
    if (!verifyPass) {
        return res.status(404).json({
            success: false,
            message: 'Incorrect password',
        })
    }

    //Token generation
    const Ownertoken = jwt.sign({ id: findOwner._id },
        generateToken.accessToken, {
        expiresIn: '1d',
    });

    res.cookie('Ownertoken', Ownertoken,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    });

    res.status(200).json({
        success: true,
        message: 'Login Successfully',
    })

}

const signoutOwner = async (req, res) => {
    try {
        const { id } = req.owner;

        const findOwner = await ownerModel.findById(id);
        if (!findOwner) {
            res.status(404).json({ success: false, message: 'No owner found' })
        }

        res.clearCookie('Ownertoken', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.status(200).json({ success: true, message: 'Singout successfully' })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}

module.exports = { registerOwner, signoutOwner, loginOwner, getOwner };