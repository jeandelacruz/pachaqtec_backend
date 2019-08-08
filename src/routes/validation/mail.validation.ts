import { check } from 'express-validator';

export default {
  sendMailing: [
    check('name')
      .isAlpha()
      .withMessage('Favor de ingresar solo letras'),
    check('email')
      .isEmail()
      .withMessage('Favor de ingresar un correo valido'),
    check('comment')
      .isAlphanumeric()
      .withMessage('Favor de ingresar un comentario'),
  ],
};
