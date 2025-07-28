// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express';

type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
  exp?: number;
};

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}
