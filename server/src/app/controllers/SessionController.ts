import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

import IController from './IController';
import authConfig from '../../config/auth';
import UserRepository from '../repositories/UserRepository';
import RatingRepository from '../repositories/RatingRepository';

export default class SessionController extends IController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserRepository.findOne({
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

    const loggedUser = await UserRepository.findOne({
      where: { id: user.id },
      join: [
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    res.status(200).json({
      user: loggedUser,
      token,
    });
  }
}
