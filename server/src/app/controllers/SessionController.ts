import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { authConfig } from '@config/auth';

import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class SessionController implements IController {
  constructor(private readonly repoService: RepositoryService) {}

  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.repoService.users.findOne({
      attrs: ['id', 'email', 'password'],
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: { message: 'User not found', field: 'email' } });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: { message: 'Wrong password', field: 'password' } });
      return;
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret as Secret, {
      expiresIn: authConfig.expiresIn,
    });

    const loggedUser = await this.repoService.users.findOne({
      where: { id: user.id },
    });

    res.status(200).json({
      user: loggedUser,
      token,
    });
  }
}
