import cors from 'cors';

const useCors = app => {
  app.use(
    cors({
      origin(origin, callback) {
        return callback(null, true);
      },
      methods: 'PUT, POST, GET, DELETE',
      credentials: true,
    })
  );
};

export default useCors;
