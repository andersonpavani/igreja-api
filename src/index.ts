import 'express-async-errors';
import express from './external/express';
import BCrypt from './external/bcrypt';
import Jwt from './external/jwt';
import Adapters from './adapters';

const bcrypt = new BCrypt();
const jwt = new Jwt(process.env.JWT_SECRET ?? '@S3cr3t!');
new Adapters(express, bcrypt, jwt);

const PORT = process.env.PORT ?? 3000;

express.listen(PORT, () => {
  console.log(`API do Sistema Igreja rodando na porta ${PORT}`);
});