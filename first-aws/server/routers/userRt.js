const exp = require('express'); 
const users = require('../models/user');

const userRt = exp.Router();

userRt.get('/users' , async(req , res) => {
    res.send('Lets go');   
})

module.exports = userRt; 