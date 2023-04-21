import { Title } from '@angular/platform-browser';

export interface User {
    idusuario?: number,
    usuario?: string,
    nombre?: string,
    correo?: string,
    tipo?: string,
    cve_empleado?: string,
    operativo?: boolean,
    listaCorreo?: boolean
};