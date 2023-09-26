import express from 'express';

// middlewares
import useCors from 'middlewares/useCors';
import useBaseMiddlewares from 'middlewares/useBaseMiddlewares';

// routers
import useAuthorizedApiRouter from 'routers/authorizedApi';
import useEmailLoginRouter from 'routers/emailLogin/emailLogin.router';

// renderers
import useRenderApp from 'middlewares/useRenderApp';

const app = express();

useBaseMiddlewares(app);
useCors(app);

useEmailLoginRouter(app);
useAuthorizedApiRouter(app);

// renderers
useRenderApp(app);

export default app;
