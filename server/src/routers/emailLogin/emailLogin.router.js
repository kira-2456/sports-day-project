import { Router } from 'express';

import { logout, login, validateSignInPayload, signUp, validateSignUpPayload } from './emailLogin.controller';

const router = new Router();

router.post('/sign-up', validateSignUpPayload, signUp);
router.post('/login', validateSignInPayload, login);
router.get('/logout', logout);

export default app => app.use(/\/email-auth\.*/, router);
