import { HelperClass } from '@helpers/helper';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handlerResponse } from '@helpers/logger.helper';
import { Interested } from '@entity/interested.entity';
import { getRepository } from 'typeorm';

const helper = new HelperClass();

class MailController {
    public static sendMailing = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return handlerResponse(res, 500, { message: errors.array() }, false); }
        const { name, email, comment } = req.body;

        const interested = new Interested();

        interested.name = name;
        interested.email = email;
        interested.comment = comment;

        const interestRepository = getRepository(Interested);

        try {
            await interestRepository.save(interested);
            const initMailGun = helper.mailGun();
            initMailGun.messages().send({
                from: 'landing@pachaqtec.com',
                to: email,
                subject: 'Prueba de la landing',
                html: `Muchas gracias por ponerse en contacto con nosotros, Saludos.`,
            }, (err, body) => {
                if (err) { return handlerResponse(res, 500, {
                    message: 'Ocurrio un error al enviarle el correo de confirmacion, nos pondremos en contacto contigo a la brevedad.',
                }); }
            });

            return handlerResponse(res, 200, {
                message: 'Tus datos han sido registrados correctamente, nos pondremos en contacto contigo a la brevedad.'
            });
        } catch (e) {
            return handlerResponse(res, 500, { message: 'Ocurrio un error al guardar los datos, intente nuevamente.' });
        }
    };
}

export default MailController;
