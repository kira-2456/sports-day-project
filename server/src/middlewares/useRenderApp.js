import path from 'path';
import { Router } from 'express';

const renderApp = (req, res) => {
  res.sendStatus(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
};

const router = new Router();

router.get('*', renderApp);

export default app => app.use(router);
