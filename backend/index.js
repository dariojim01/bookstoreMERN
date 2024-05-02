import express from "express";
import { PORT } from "./config.js";
import { URLDB } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import bookRoute from  "./routes/bookRoute.js";

const app = express();
//Middleware para parsear request body
app.use(express.json());

//Middleware para activar coors
//Opcion 1 any
app.use(cors());
//Opcion 2 options
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST','DELETE'],
    allowedHeaders: ['Content-Type']
}));


app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send("WELCOME MERN DJ");
});

app.use('/v1/books', bookRoute);

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

