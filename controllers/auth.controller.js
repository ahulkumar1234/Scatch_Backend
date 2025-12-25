const userModel = require('../models/user.model');
const generateToken = require('../configs/envVariables')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envVariables = require('../configs/envVariables');


const getAllUser = async (req, res) => {
    try {
        let getUsers = [];
        getUsers = await userModel.find();
        return res
            .status(200)
            .json({
                success: true,
                message: "all users fetched successfully",
                allUsers: getUsers,
            });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "failed to fetch all users"
        })
    }
}

const profile = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "User fetched!",
            user: req.user
        });
    } catch (error) {
        res.status(509).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const uploadProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const imageUrl = req.file.path; // Cloudinary secure URL
        const userId = req.user.id;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { picture: imageUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                loggedIn: false,
                message: 'Please login to access!'
            });
        }

        const decoded = jwt.verify(token, envVariables.accessToken);
        const user = await userModel.findById(decoded.id).select('-password'); //(-password)means dont send the password

        return res.status(200).json({
            loggedIn: true,
            user,
        });

    } catch (error) {
        res.status(401).json({
            loggedIn: false,
            error: error.message
        });
    }
}

const registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        // Validate
        if (!email || !fullname || !password) {
            return res.status(401).json({
                message: 'All fields are required',
            });
        }

        // Check if user exists
        let User = await userModel.findOne({ email })
        if (User) {
            return res.status(400).json({
                message: "user already exist",
            });
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const createdUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        // Token generation
        const token = jwt.sign({ email, id: createdUser._id },
            generateToken.accessToken, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        res.status(200).json({
            message: 'User created succefully',
            user: createdUser,
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }

}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        //Check all field required
        if (!email || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "all fields are required",
                })
        }

        //Check user exist or not
        const findExistingUser = await userModel.findOne({ email });

        if (!findExistingUser) {
            return res.status(404).json({
                success: false,
                message: "User with email not found",
            });
        }
        //Check password correct or not
        const verifyPassword = await bcrypt.compare(password, findExistingUser.password);
        if (!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Token generation
        const token = jwt.sign({ id: findExistingUser._id },
            generateToken.accessToken, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            success: true,
            message: "Login successfully"
        })

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "failed to login user"
            });
    }
}

const updateUser = async (req, res) => {

}

const logoutUser = async (req, res) => {

    try {
        const { id } = req.user;
        const token = req.cookies.token;
        const findUser = await userModel.findById(id);

        if (!findUser) {
            res.status(400).json({
                success: false,
                message: 'No user found',
            })
        }
        res.clearCookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Logout successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }

};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.log(error); // 🔥 debugging
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { registerUser, loginUser, updateUser, logoutUser, getAllUser, checkAuth, profile, uploadProfile, deleteUser }