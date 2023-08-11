import config from './dbconfig.js';
import sql from 'mssql'
 
export class Usuario {
    static Login = async (usuario, contrasenna) => {
        console.log("Estoy en log-in", usuario, contrasenna);
        let returnEntity = null;
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pusuario", sql.NVarChar(4000), usuario)
                .input("pContrasenna", sql.NVarChar(4000), contrasenna)
                .query("SELECT * FROM Usuario WHERE usuario = @pUsuario AND Contrasenna = @pContrasenna");
            returnEntity = result.recordsets[0];
            console.log(returnEntity)
        } catch (error) {
            console.log(error, "");
        }
        return returnEntity;
    }
    static Register = async (U) => {
        const {usuario, contrasenna} = U
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('usuario', sql.NVarChar(4000), usuario)
            .input('Contrasenna', sql.NVarChar(4000), contrasenna)
            .query('INSERT INTO Usuario (usuario,Contrasenna) VALUES (@usuario, @contrasenna)')
    }
}