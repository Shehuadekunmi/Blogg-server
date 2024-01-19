import mongoose from 'mongoose'

const bloggSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    
    tag:{
        type: String,
        required: true,
        enums: ['sport', 'healthcare', 'lifestyle', 'selfdefence', 'construction', 'history', 'other']
    },
     image:{
        type: String,
        required: true
     },
     story:{
        type: String,
        required: true
     },

     createdAt:{
        type: Date,
        default: Date.now()
     },
     userRef:{
        type: String,
        required: true
     },

     status: {
       type: String,
         enum: ['published', 'draft'], default: 'draft'
       },

}, {timestamps: true});

const Blogg = mongoose.model('Blogg', bloggSchema)
export default Blogg