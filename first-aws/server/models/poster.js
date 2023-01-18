const mongo = require('mongoose'); 

const { model , Schema } = mongo;

const posterSchema = new Schema({
    author: {type: Schema.ObjectId , ref: 'instaUsers', required: true},
    pic: {type: Array , required: true}, 
    topic: {type: String, required: true}, 
    likes: {type: Number , required: true, default: 0},  
    comments: [],     
}, {timestamps: true}); 

const posts = model('instaPosts' , posterSchema); 

module.exports = posts; 