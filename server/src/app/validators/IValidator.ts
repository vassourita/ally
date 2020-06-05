import { Request, Response, NextFunction } from 'express';

export interface IValidator {
  validate: (req: Request, res: Response, next: NextFunction) => void;
}
