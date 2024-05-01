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

//Route para crear un book
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
//Route para obtener los books
app.get('/books', async (req, res)=>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});
//Route para obtener un book por ID
app.get('/books/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const books = await Book.findById(id);

        return res.status(200).json(books);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});
//Route para actualizar un book por ID
app.put('/books/:id', async (req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = req.params;
        const books = await Book.findByIdAndUpdate(id, req.body);
        if(!books){
            return res.status(404).send({
                message: 'Book not found',
            });
        }
        return res.status(200).send({
            message: 'Book actualizado',
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

//Route para borrar un book por ID
app.delete('/books/:id', async (req, res)=>{
    try {
       

        const { id } = req.params;
        const books = await Book.findByIdAndDelete(id);
        if(!books){
            return res.status(404).send({
                message: 'Book not found',
            });
        }
        return res.status(200).send({
            message: 'Book eliminado',
        });
    } catch (error) {
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

