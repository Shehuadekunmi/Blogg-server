import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
 const {username, email, password} = req.body;
 const hashedpassword = await bcryptjs.hash(password, 10);
 const newUser = new User({username, email, password: hashedpassword})
 try {
    await newUser.save();
    res.status(201).json('User created succesfully')
 } catch (error) {
    next(error)
 }
};

export const signin = async (req, res, next) => {
const {email, password } = req.body;
try {
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404, 'User not found'))
    const validPassowrd = await bcryptjs.compare(password, validUser.password)
    if(!validPassowrd) return next(errorHandler(404, 'wrong cridential'));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

} catch (error) {
    next(error)
}
};

export const google = async (res, req, next) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, {httpOnly}).status(200).json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) +
             Math.random().toString(36).slice(-8);
            const hashedpassword = bcryptjs.hashSync(generatePassword, 10)
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + 
                Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedpassword,
                avater: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly}).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_cookie');
        res.status(200).json('User has been logout successfully')
    } catch (error) {
        next(error)
    }
};

