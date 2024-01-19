import { errorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
import Blogg from "../model/blogg.model.js";
import bcrptjs from 'bcryptjs'

export const updateuser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your account'))
    }
    try {
        if(req.body.password){
            req.body.password = bcrptjs.hashSync(req.body.password, 10)
        };
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username : req.body.username,
                email : req.body.email,
                password: req.body.password,
                avater: req.body.avater
            },
        }, { new: true });

        const {password, ...rest} = updateuser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }; 
};

export const deleteUser = async (req, res, next) => {
    if(req.body.id !== req.params.id){
        return next(errorHandler(401, 'You can only delete your account'))
    };
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(201).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getUserblogg = async (req, res, next) => {
    if (req.user.id === req.params.id ) { 
        try {
            const bloggs = await Blogg.find({ userRef : req.params.id});
            res.status(200).json(bloggs)
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your bloggs'))
    }
};

export const getuser = async (req, res, next) => {
    try {
        const user = await User.findById( req.params.id);
        if(!user) return next(errorHandler(404, 'user not found'));
        const { password : pass, ...rest} = user._doc;
        
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}