import { UserErrorType } from 'enums/ErrorType';

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = await req.authInterface.verify({ token });
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json(UserErrorType.INVALID_TOKEN);
  }
};

export default authMiddleware;
