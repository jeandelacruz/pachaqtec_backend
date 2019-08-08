import { Router } from 'express';
import mail from '@routes/mail.route';

const routes = Router();

routes.use('/mail', mail);

export default routes;
