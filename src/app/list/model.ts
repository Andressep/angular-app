export class Turno {
    id: number;
    instalacion: string;
    pago: string;
    fecha: string;
    comprobante: string;
    foto?: string;
}

export class Credentials {
    nombreUsuario: String;
    clave: String;
    rol?: Roles;
}

export enum Roles {
    Administrador = "ADMINISTRADOR",
    UsuarioRestringido = 'USUARIO_RESTRINGIDO'
}