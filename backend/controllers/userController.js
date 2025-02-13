import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken" //authentication
import bcrypt from "bcrypt" // encryption
import validator from "validator" //validation like email and password

//login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message:"User doesnt exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentails"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET) // jwt.sign is a method of jsonwebtoken library
}

//register user 
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }

        // validating email format and strong password 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        } 

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        } 

        //hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save(); // new user save in the database and store in the user vaiable
        const token = createToken(user._id) // so generates a JWT for the user using the user id (_id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser};