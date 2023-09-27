import { Router } from 'express';

import authMiddleware from 'middlewares/authMiddleware';
import { signUpValidator, signInValidator } from 'validators/emailLoginValidator';

import { logout, login, signUp } from './emailLogin.controller';

const router = new Router();

router.post('/sign-up', signUpValidator, signUp);
router.post('/login', signInValidator, login);
router.get('/logout', authMiddleware, logout);

export default app => app.use(/\/email-auth\.*/, router);
