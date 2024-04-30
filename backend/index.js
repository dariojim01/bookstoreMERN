import express, { response } from "express";
import { PORT } from "./config.js";
import { URLDB } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json());


app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send("WELCOME MERN DJ");
});

//Route
app.post('/books', async (req, res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);


    }catch (error){
        res.status(500).send({message: error.message});

    }

});

mongoose
    .connect(URLDB)
    .then(()=>{
        console.log("Conexion exitosa");
        app.listen(PORT, () =>{
            console.log(`Server listen: ${PORT}`);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    });

