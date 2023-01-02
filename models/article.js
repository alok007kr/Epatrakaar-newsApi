import mongoose from 'mongoose'
const Schema = mongoose.Schema


const articleSchema = new Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    images:{
        type:String
    },
    content:{
        type:String,
        required:true,
        unique:true
    },
    
 //Added Category whose type is string and tags, keywords can store 
    
    category:{
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    }

}, { timestamps:true})

export default mongoose.model('Article', articleSchema, 'articles')
