import { Request, Response, NextFunction } from 'express';

export function validarEncabezadosObligatorios(
  encabezadosObligatorios: string[]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;

    const faltanEncabezados = encabezadosObligatorios.filter(
      header => !headers[header]
    );

    if (faltanEncabezados.length > 0) {
      return res.status(400).json({
        mensaje: 'Faltan encabezados obligatorios',
        encabezadosFaltantes: faltanEncabezados,
      });
    }

    return next();
  };
}
