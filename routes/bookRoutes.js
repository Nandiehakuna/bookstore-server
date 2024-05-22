const express = require('express');
const {Book} = require('../model/bookModel');

const route = express.Router();

route.post("/book", async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:"send all the required fields title,author,publishYear "})
        }

        const newBook ={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book =await Book.create(newBook);
        return response.status(201).send(book);


     
    }catch(error){
        console.error(error);
        response.status(500).send({message:error.message})
    }
    
});

route.get("/books", async(request,response)=>{
    try{
        const books =await Book.find({})
        return response.status(200).json({
            count:books.length,
            data:books
        });
    }catch{
        console.error(message.error);
        response.status(500).send({message:message.error})
    }
});
// to get one book

route.get("/book/:id", async(response)=>{
   try{
        const {id} =req.params;

        const book=await Book.find(id);
        return response.status(201).json(book);

    }catch{
        console.error(message.error);
        return response.status(500).send({message:message.error});

    }
});

// update a user

route.put("/book/:id", async(request, response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:"enter all the required fields "})
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body );
        if(!result){
            return response.status(400).json({message:"book not found"});

        }
        return response.status(200).send({message:"book was successfully updated "});

        

    }catch{
        console,error(message.error);
        return response.send(500).send({message:message.error});
    }
});

// delete a book 

route.delete("/book/:id", async(request, response)=>{
    try{
        const {id} =request.params;

        const result =await Book.findByIdAndDelete(id);
        if(!result){
            response.status(404).json({message:"book not found"});
        }
        response.status(201).json({message:"book deleted successfully"});

        

    }catch{
        console.error(message.error);
        response.status(500).send({message:message.error});

    }
    

});


module.exports=route;