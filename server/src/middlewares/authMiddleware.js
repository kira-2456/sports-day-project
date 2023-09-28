import { UserErrorType } from 'enums/ErrorType';

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: UserErrorType.INVALID_TOKEN });
  }

  try {
    const decoded = await req.authInterface.verify({ token });
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: UserErrorType.INVALID_TOKEN });
  }
};

export default authMiddleware;
