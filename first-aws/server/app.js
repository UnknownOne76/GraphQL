const exp = require('express'), mongo = require('mongoose'); 
const postRt = require('./routers/postRt');
const userRt = require('./routers/userRt');
let cors = require('cors'); 
require('dotenv').config();  
const app = exp() , port = 3030, url = process.env.URL;
app.use(cors()); 
app.use(exp.json());
app.use(postRt , userRt); 
mongo.set('strictQuery', true);

mongo.connect(url).then(() => {
    console.log('Successfully Connected!'); 

    app.listen(port , () => {
        console.log(`Listening on http://localhost:${port}`); 
    }); 
}).catch(err => console.log(err)); 

