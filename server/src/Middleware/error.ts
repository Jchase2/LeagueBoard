import { Request, Response } from "express";
const ErrorResponse = require('../utils/errorResponse');

interface IResponseWithError extends Response {
  message: string;
  code: number;
  name: string;
  errors: { [message: string]: string[] };
}

const errorHandler = (err : IResponseWithError, req : Request, res : Response, next : Function) => {
  let error = { ...err };
  error.message = err.message;

  if ( err.code === 11000 ) {
    error = new ErrorResponse('Duplicate entry', 400);
  }

  if (err.name === 'ValidationError') {
    error = new ErrorResponse(Object.values(err.errors).map(val => val), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;