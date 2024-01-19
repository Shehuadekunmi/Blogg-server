import {errorHandler} from '../utils/error.js'
import Blogg from '../model/blogg.model.js'

export const createblogg = async (req, res, next) => {
    try {
        const blogg = await Blogg.create(req.body);
       return res.status(201).json(blogg)
    } catch (error) {
        next(error)
    }
};

export const publishedBlogg = async (req, res, next) => {
    if (req.user.id === req.params.id){
        try {
            const blogg = await publishedBlogg.find({status : 'published'});
            res.status(201).json(blogglogg)
        } catch (error) {
            next(error)
        } 
    } else {
        return next(errorHandler(404, 'You dont have published blogg at the moment '))
    }
}

export const draftblogg = async (req, res, next) => {
    if (req.user.id === req.params.id ) { 
        try {
            const blogg = await Blogg.find({ userRef : req.params.id, status: 'draft'});
            res.status(200).json(blogg)
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You dont have draft blogg at the moment'))
    }
}

export const updateblogg = async (req, res, next) => {
    const blogg = await Blogg.findById(req.params.id);
    if(!blogg) {
        return next(errorHandler(401, 'Blogg not found'))
    };
    if(req.user.id !== blogg.userRef){
        return next(errorHandler(401, ('You can only update your blogg')))
    };
    try {
        const updatedBlogg = await Blogg.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedBlogg)
    } catch (error) {
        next(error)
    }
};

export const deleteblogg = async (req, res, next) => {
    const blogg = await Blogg.findById(req.params.id)
    if(!blogg) {
        return next(errorHandler(404, 'blogg not found'))
    };
    if(req.params.id !== blogg.userRef) {
        return next(errorHandler(401, ('You can only delete your blogg')))
    };

    try {
        await Blogg.findByIdAndDelete(req.params.id)
        res.status(200).json('Blogg has been deleted ')
    } catch (error) {
        next(error)
    }
};

export const getBlogg = async (req, res, next) => {
    try {
        const blogg = await Blogg.findById(req.params.id)
        console.log(blogg);
    if(!blogg) {
        return next(errorHandler(404, 'Blogg not found'))
    }
    res.status(200).json(blogg)
    } catch (error) {
        next(error)
    }
};

export const getBloggs = async (req, res, next) => {
try {
    const limit = parseInt(req.query.limit) || 9;
    
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc'

    const blogg = await Blogg.find({
        name: { $regex: searchTerm, $option: 'i'},
        tag
    }).populate('userRef').sort({ [sort]: order}).limit(limit).skip(startIndex)
    res.status(200).json({success: true, blogg});
} catch (error) {
    next(error)
    
}
}

