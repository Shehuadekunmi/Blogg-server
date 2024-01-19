import { errorHandler } from "../utils/error.js";
import Comment from "../model/commentModel.js";


export const createComment = async (res, req, next) => {
    try {
        const newComment = Comment(req.body);
        const saveComment = await newComment.save();
        res.status(200).json(saveComment)
    } catch (error) {
        next(error)
    };
};

export const updateComment = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your comment'))
    }
    try {
        const updatedcomment = await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
        res.status(200).json(updatedcomment)
    } catch (error) {
        next(error)
    }
};

export const deleteComment = async (res, req, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your comment'))
    }
    try {
         await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted");
    } catch (error) {
        next(error)
    };
};

export const getComment = async (res, req, next) => {
    try {
        const comments = await Comment.find(req.params.blogId)
    } catch (error) {
        next(error)
    }
}