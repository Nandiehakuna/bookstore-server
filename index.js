const express= require('express');
const mongoose= require('mongoose');
const {PORT, mongoDbUrl} = require('./config');
const cors =require('cors');

const route =require('./routes/bookRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response)=>{
    console.log(request);
    response.status(234).send({message:"welcome to my application"});


});

app.use(route);

mongoose.connect(mongoDbUrl)
.then(()=>{
console.log(`app connected to database`);
app.listen(PORT, ()=>{
    
    console.log(`app is listening to port: ${PORT}`);
});


})
.catch((error)=>{
    console.error(error);

})

