import { Request, Response, NextFunction } from 'express';
import jwtUtil from '../utils/jwtUtil';

class AuthValidate {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const payload = jwtUtil.verify(token);
      res.locals.payload = payload;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthValidate;
