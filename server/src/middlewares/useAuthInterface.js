import JWTAuth from 'interfaces/JWTAuth';

const useAuthInterface = app => {
  app.use((req, res, next) => {
    req.authInterface = new JWTAuth({ secretKey: process.env.JWT_SECRET_KEY });

    next();
  });
};

export default useAuthInterface;
