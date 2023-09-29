import config from './dbconfig.js';
import sql from 'mssql'
 
export class Usuario {
    static Login = async (usuario, contrasenna) => {
        console.log("Estoy en log-in", usuario, contrasenna);
        let returnEntity = null;
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pUsuario", sql.NVarChar(4000), usuario)
                .input("pContrasenna", sql.NVarChar(4000), contrasenna)
                .query("SELECT * FROM Usuario WHERE usuario = @pUsuario AND Contrasenna = @pContrasenna");
            returnEntity = result.recordset[0];
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

    static getIdUsuarioByNombre = async(nombre) => {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input("usuario", sql.NVarChar, nombre)
            .query("SELECT id FROM Usuario WHERE usuario = @usuario");
        return res.recordset[0];
    }

    static updateUsuario = async (id,u) => {
        const { contrasenna, usuario, apellido} = u
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('contrasenna',sql.NVarChar(50),contrasenna)
                .input('nombre', sql.NVarChar(50), usuario)
                .input('apellido', sql.NVarChar(50), apellido)
                .query('UPDATE Usuario SET contrasenna = @contrasenna, usuario = @usuario, apellido = @apellido WHERE ID = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}

