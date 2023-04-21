import { Request, Response } from 'express';

import pool from '../database';
import Encryption from '../lib/helpers';

class UsuariosController {

    public async login(req: Request, res: Response): Promise<any> {
        const usuario = req.body;
        try {
            const row = await pool.query('call loginUsuario(?)', [usuario.usuario]);
            if (row.length > 0) {
                const user = row[0];
                const validatePassword = await Encryption.matchPassword(usuario.password, user[0].password.toString());
                if (validatePassword) {
                    await pool.query('call actualizarEstatusUsuario(?)', [user[0].idusuario]);  // actualizamos el estatus de del usuario
                    const usuarioLogueado = await pool.query('call datosUsuarioEmpleado(?)', [user[0].idusuario]); // obtenemos su perfil del usuario
                    return res.status(200).json(usuarioLogueado[0]);
                }
                else {
                    await pool.query('call insertarBitacora(?,?,?)', [user[0].idusuario, "Login", "NOK"]);
                    return res.status(401).json({ text: "Credenciales incorrectas" });
                }
            }
        } catch (error: any) {
            res.status(400).json("Ocurrio un error!!, Verificar Credenciales!!");
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            const idusuario = req.params.idusuario;
            await pool.query('call logoutUsuario(?)', [idusuario]);
            res.status(200).json({ text: "Usuario sin inicio de sesión!" });
        } catch (error: any) {
            console.log(error.message);
            res.status(400).json("Ocurrio un error!!, Contacte A Soporte");
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {

        try {
            const { id } = req.params;
            const usuario = await pool.query('call obtenerUnUsuarioEmpleado(?)', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            res.status(404).json({ text: "El usuario no existe" });
        } catch (error: any) {
            console.log(error.message);
        }


    }

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const rows = await pool.query('call listarUsuarios()');
            res.status(200).json(rows);
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async listModules(req: Request, res: Response): Promise<void> {
        try {
            const usuario = req.body;
            const modules = await pool.query('call obtenerModulosAcceso(?)', [usuario.rol]);
            res.json(modules);
        } catch (error: any) {
            res.status(400).json(error.message);
        }


    }

    /*

    public async create(req: Request, res: Response): Promise<void> {
        const user = req.body;
        //console.log(req.body);
        user.password =  await Encryption.encryptPassword(user.password);
        //res.json(user);
        const result = await pool.query('INSERT INTO usuario set ?', [user]);
        let newUser = result.insertId();
        const updateEmpleado = await pool.query('UPDATE empleado SET ');
        res.json({ message: 'Usuario Guardada' });
    }

    */

    public async verificarUsuarioLibre(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        try {
            const row = await pool.query('call verificarUsuarioLibre(?)', [id]);
            res.status(200).json(row);
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    public async insertarUsuario(req: Request, res: Response): Promise<any> {
        const { idusuario, idrol, usuario, password, email, operativo, listaCorreo, cveEmpleado } = req.body;
        // user.password =  await Encryption.encryptPassword(user.password);

        const passwordFinal = await Encryption.encryptPassword(password);

        try {
            await pool.query('call insertarUsuario(?, ?, ?, ?, ?, ?, ?, 1,?)', [idusuario, idrol, usuario, passwordFinal, email, operativo, listaCorreo, cveEmpleado]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async insertarLocalidadUsuario(req: Request, res: Response): Promise<any> {
        const { idlocalidad, idusuario } = req.body;
        try {
            await pool.query('call insertarLocalidadUsuario(?, ?)', [idlocalidad, idusuario]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async eliminarLocalidadUsuario(req: Request, res: Response): Promise<any> {
        const { idusuario, idlocalidad } = req.body;
        try {
            await pool.query('call eliminarLocalidadUsuario(?, ?)', [idusuario, idlocalidad]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<any> {
        const { idusuario, idusuarioNuevo, idrol, usuario, password, email, operativo, listaCorreo, cveEmpleado, passAnterior, passdiferente } = req.body;
        let passwordFinal = await Encryption.encryptPassword(password);

        if (passdiferente == 1) {
            passwordFinal = passwordFinal;
        } else {
            passwordFinal = passAnterior;
        }

        try {
            await pool.query('call actualizarUsuario(?,?,?,?,?,?,?,?,1,?)', [idusuario, idusuarioNuevo, idrol, usuario, passwordFinal, email, operativo, listaCorreo, cveEmpleado]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<any> {
        const { idusuario } = req.body;
        try {
            await pool.query('call eliminarUsuario(?)', [idusuario]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }


    public async obtenerLocalidadesUsuario(req: Request, res: Response): Promise<any> {
        const idusuario = req.params.idusuario;
        try {
            const resultados = await pool.query('call obtenerLocalidadesUsuario(?)', idusuario);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async obtenerLocalidadesNoUsuario(req: Request, res: Response): Promise<any> {
        const idusuario = req.params.idusuario;
        try {
            const resultados = await pool.query('call obtenerLocalidadesNoUsuario(?)', idusuario);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async buscarPatronUsuario(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronUsuario(?)', cadena);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }
}

const usuario = new UsuariosController();
export default usuario;