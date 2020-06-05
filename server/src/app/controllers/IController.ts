import { Request, Response } from 'express';

export default abstract class IController {
  index?(req: Request, res: Response): Promise<void>;

  show?(req: Request, res: Response): Promise<void>;

  store?(req: Request, res: Response): Promise<void>;

  update?(req: Request, res: Response): Promise<void>;

  delete?(req: Request, res: Response): Promise<void>;
}
