import jwt from 'jsonwebtoken';

class JWTAuth {
  constructor({ secretKey }) {
    this.secretKey = secretKey;
  }

  create = ({ payload, options }) =>
    new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretKey, { expiresIn: '1h', ...options }, (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      });
    });

  verify = ({ token }) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, {}, (err, payload) => {
        if (err) {
          reject(err);
        }

        resolve(payload);
      });
    });
}

export default JWTAuth;
