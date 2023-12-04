import { Request, Response, NextFunction } from 'express';

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

const validateEmailAndPassword = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export { validateFields, validateEmailAndPassword };
