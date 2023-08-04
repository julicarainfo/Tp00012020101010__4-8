import  express from "express";

const app = express();
const port = 5000;
app.use(express.json());



let usuario="papaletas";
let contraseña = "papalaletasaletas";



app.post('/login',async(req,res)=>{
    let usuarioIngresado = req.body.usuario
    let contraseñaIngresada = req.body.contraseña
    if (usuarioIngresado === usuario  && contraseñaIngresada === contraseña) {
        res.status(200).send(" pudiste iniciar sesion correctament");
	} else {
		res.status(400).send("Usuario o contraseña invalidos");
	}
})
app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})