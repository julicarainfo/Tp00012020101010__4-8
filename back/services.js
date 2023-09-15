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

    static getIdUsuarioByNombre = async(nombre) => {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input("usuario", sql.NVarChar, nombre)
            .query("SELECT id FROM usuario WHERE usuario = @usuario");
        return res.recordset[0];
    }

    static Perfil = async (P) => {
        const {usuario, nomnbre,apellido,fechaNacimiento} = P

        let idUsuario = getIdUsuarioByNombre(usuario);

        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('fkUsuario', sql.NVarChar(4000),idUsuario )
            .input('usuario', sql.NVarChar(4000),nombre )
            .input('usuario', sql.NVarChar(4000),apellido )
            .input('usuario', sql.Date,fechaNacimiento )
            .input('usuario', sql.Int,fkUsuario )
            .query('INSERT INTO Perfil (usuario,Contrasenna) VALUES (@usuario, @contrasenna)')
    }
    static updateUsuario = async (usuario) => {
        const { Id, Contraseña, Nombre, Apellido, fechaNacimiento} = usuario
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .input('contraseña',sql.NVarChar(50),Contraseña)
                .input('nombre', sql.NVarChar(50), Nombre)
                .input('apellido', sql.NVarChar(50), Apellido)
                .input('fechaNacimiento', sql.Date, FkRol)
                .query('UPDATE Usuarios SET Contrasenia = @contraseña, Nombre = @nombre, Apellido = @apellido, fechaNacimiento = @fechaNacimiento')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}

