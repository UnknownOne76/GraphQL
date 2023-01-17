const exp = require('express');
const app = exp() , port = 3030; 
app.use(exp.json());

app.listen(port , () => {
    console.log(`Listening on http://localhost:${port}`); 
}); 

