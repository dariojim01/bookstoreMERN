import express from "express";

import { Book } from "../models/bookModel.js";
const router = express.Router();

//Route para crear un book
router.post('/', async (req, res)=>{
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
router.get('/', async (req, res)=>{
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
router.get('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const books = await Book.findById(id);

        return res.status(200).json(books);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});
//Route para actualizar un book por ID
router.put('/:id', async (req, res)=>{
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
router.delete('/:id', async (req, res)=>{
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

export default router;