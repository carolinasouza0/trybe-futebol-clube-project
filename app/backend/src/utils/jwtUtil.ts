import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../Interfaces/Login/Payload';

const secret = process.env.JWT_SECRET || 'secret';

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload {
  const payload = jwt.verify(token, secret) as TokenPayload;
  return payload;
}

export default {
  sign,
  verify,
};
