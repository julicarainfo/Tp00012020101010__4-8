import  express from "express";
import cors from "cors";
var app = express()
const port = 5000;
app.use(express.json());
app.use(cors())


let UsuariosRegistrados = [
    {
    usuario:"papaletas",
    contraseña : "papalaletasaletas";
},
]




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

app.post('/register', async(req,res)=>{
    let usuario = req.body.usuario
    let contraseña = req.body.contraseña

})