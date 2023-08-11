import  express from "express";
import { Usuario} from "./services.js";
import config from './dbconfig.js';
import sql from 'mssql';
import cors from 'cors';
const app = express();
const port = 5000;
app.use(express.json())
app.use(cors());


app.post('/registrarse',async(req,res) =>{
    try{
        console.log(req.body)
        const r = await Usuario.Register(req.body)
        res.status(201).json({message: 'Usuario registrado'})
    } catch (error){
        console.log(error)
        if (r.length === 0) {
            res.status(500).json({error : 'Fallo el registro'})
        }
        
    }

})

//funca
app.post('/login',async(req,res) =>{
    try{
        console.log(req.body)
        const response = await Usuario.Login(req.body.usuario, req.body.contrasenna)
        console.log(response);
        if (response.length === 0) {
            res.status(401).json({message: "Incorrecto"});
        } else {
            res.status(200).json({usuario: response})
        }
        res.status(200).json({message : 'Usuario encontrado'})  
    }catch(error){
        console.log(error)
        res.status(404).json({error : 'No se encontro el usuario'})
    }

})
app.listen(port)