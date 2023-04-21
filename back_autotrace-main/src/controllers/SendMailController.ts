import { Request, Response } from "express";
import pool from "../database";
import nodemailer from "nodemailer";
const toCsv = require('to-csv');

class SendMailController {
  public async senMail(req: Request, res: Response) {
    const { doc, cadena, IdLista }  = req.body;
    var transporte = nodemailer.createTransport({
      service: "gmail",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'Autotrace2021@gmail.com',
      pass: 'AutoTrace#2030',
    },
    logger: true
    });

    var mailOptions = {
      from: "Autotrace2021@gmail.com",
      to: cadena,
      subject: "Vins En Lista No."+IdLista,
    
      attachments: [
        {   
            filename: 'Vins_Lista_'+IdLista+'.csv',
            content:  doc,
        }]
    };

    transporte.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(404).json({mensaje: error.message});
      } else {
        if(info.response){
            res.status(200).json({ message: "Correo Enviado Con Exito" });
        }
      }

    });

  }

  public async listaCorreos(req: Request, res: Response) {
    
    try {
        const resultados = await pool.query('call listaCorreos()');
            res.status(200).json(resultados);
    } catch (error:any) {
        res.status(404).json({mensaje: error.message});
    }
  }
}
const sendMailController = new SendMailController();
export default sendMailController;
