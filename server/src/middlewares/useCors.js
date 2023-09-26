import cors from 'cors';

const useCors = app => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );
};

export default useCors;
