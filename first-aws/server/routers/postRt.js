const exp = require('express'); 
const posts = require('../models/poster');

const postRt = exp.Router(); 

postRt.get('/posts', async(req , res) => {
    const datas = await posts.find({}).populate('author');
    res.send({
        data: datas
    }) 
}); 

postRt.put('/add' , async(req, res) => {
    const {images , topic} = await req.body; 

    await posts.create({
        author: '63c7cfd3a9a40afba2222ee7', 
        pic: images, 
        topic: topic
    })
})

module.exports = postRt; 