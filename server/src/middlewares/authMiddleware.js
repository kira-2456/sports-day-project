import { UserErrorType } from 'enums/ErrorType';
import { validateUser } from 'models/user.model';

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: UserErrorType.INVALID_TOKEN });
  }

  try {
    const decoded = await req.authInterface.verify({ token });
    req.user = decoded.user;
    await validateUser(decoded.user.id);
    next();
  } catch (err) {
    req.logger.error(err.message);
    res.status(401).json({ error: UserErrorType.INVALID_TOKEN });
  }
};

export default authMiddleware;
