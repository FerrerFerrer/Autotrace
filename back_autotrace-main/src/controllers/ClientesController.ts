import { Request, Response } from 'express';
import pool from '../database';

class ClientesController {

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const clientes = await pool.query('call listarClientes()');
            res.status(200).json(clientes);
        } catch (error: any) {
            res.status(500).json({ messsage: error.message });
        }
    }

    public async insertarCliente(req: Request, res: Response): Promise<any> {
        const { cliente, ePod } = req.body;
        try {
            await pool.query('call insertarCliente(?,?, 1)', [cliente, ePod]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async insertarActualizarCliente(req: Request, res: Response): Promise<any> {
        const { idcliente, cliente, ePod, activo } = req.body;
        try {
            await pool.query('call insertarActualizarCliente(?,?,?,?)', [idcliente, cliente, ePod, activo]);
            res.status(200).json();
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { idcliente } = req.params;
        try {
            await pool.query('call eliminarCliente(?)', [idcliente]);
            res.json({ message: "El cliente ha sido eliminado" });
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async buscarPatronCliente(req: Request, res: Response): Promise<any> {
        const cadena = req.params.cadena;
        try {
            const resultados = await pool.query('call buscarPatronCliente(?)', cadena);
            res.status(200).json(resultados);
        } catch (error: any) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    public async datosClientes(req: Request, res: Response): Promise<any> {
        const fechaInicio = req.params.fechaInicio;
        const fechaFinal = req.params.fechaFinal;

        try {
            const results = await pool.query('call datosGraficaClienteMarca(?, ?)', [fechaInicio, fechaFinal]);
            res.status(200).json(results);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

const clientes = new ClientesController();
export default clientes;