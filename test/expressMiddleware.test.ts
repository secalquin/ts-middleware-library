import { Request, Response, NextFunction } from 'express';
import { validarEncabezadosObligatorios } from '../src';

describe('validarEncabezadosObligatorios Middleware', () => {
  it('debería pasar si todos los encabezados obligatorios están presentes', () => {
    const mockRequest: Partial<Request> = {
      headers: {
        Authorization: 'Bearer Token',
        'Content-Type': 'application/json',
      },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn(() => mockResponse as Response),
      json: jest.fn(),
    };
    const mockNext: NextFunction = jest.fn();

    const encabezadosObligatorios = ['Authorization', 'Content-Type'];

    const middleware = validarEncabezadosObligatorios(encabezadosObligatorios);

    middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('debería responder con un error si falta algún encabezado obligatorio', () => {
    const mockRequest: Partial<Request> = {
      headers: {
        Authorization: 'Bearer Token',
      },
    };
    const mockResponse: Partial<Response> = {
      status: jest.fn(() => mockResponse as Response),
      json: jest.fn(),
    };
    const mockNext: NextFunction = jest.fn();

    const encabezadosObligatorios = ['Authorization', 'Content-Type'];

    const middleware = validarEncabezadosObligatorios(encabezadosObligatorios);

    middleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse!.status).toHaveBeenCalledWith(400);
    expect(mockResponse!.json).toHaveBeenCalledWith({
      mensaje: 'Faltan encabezados obligatorios',
      encabezadosFaltantes: ['Content-Type'],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
