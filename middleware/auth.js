import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = (req, res, next) => {
  //console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    const testUser = payload.userId === '649960ab72f42bf8df6377bc';
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication invalid');
  }
};

export default auth;
