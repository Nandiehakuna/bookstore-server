const express= require('express');
const mongoose= require('mongoose');
const {PORT, mongoDbUrl} = require('./config');
const cors =require('cors');

const route =require('./routes/bookRoutes');

const app = express();

const corsOptions = {
    origin: 'https://main--boo-kit.netlify.app/', // Netlify frontend URL
    optionsSuccessStatus: 200
};

app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (request, response)=>{
    console.log(request);
    response.status(234).send({message:"welcome to my application"});


});

app.use(route);

mongoose.connect(mongoDbUrl ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
console.log(`app connected to database`);
app.listen(PORT, ()=>{
    
    console.log(`app is listening to port: ${PORT}`);
});


})
.catch((error)=>{
    console.error(error);

})

module.exports=app

