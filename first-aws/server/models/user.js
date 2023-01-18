const mongo = require('mongoose'); 

const { model , Schema } = mongo; 

const userSchema = new Schema({
    name: {type: String , required: true}, 
    password: {type: String, required: true}, 
    photo: {type: String, required: true}
}); 

const users = model('instaUsers' , userSchema); 

module.exports = users;