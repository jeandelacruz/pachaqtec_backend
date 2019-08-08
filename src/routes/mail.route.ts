import { Router } from 'express';
import MailController from '@controllers/mail.controller';
import MailValidation from '@validation/mail.validation';

const router = Router();

router.post('/send', MailValidation.sendMailing, MailController.sendMailing);

export default router;
