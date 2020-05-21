import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import UserRepository from '../Repositories/UserRepository';
import KnowledgeRepository from '../Repositories/KnowledgeRepository';
import JobVacancyRepository from '../Repositories/JobVacancyRepository';

export default class SessionController {
  static async store(req, res) {
    const { email, password } = req.body;

    const user = await UserRepository.findOne({
      attrs: ['id', 'email', 'password'],
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: { message: 'User not found', field: 'email' } });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: { message: 'Wrong password', field: 'password' } });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const loggedUser = await UserRepository.findOne({
      where: { id: user.id },
    });

    return res.status(200).json({
      user: loggedUser,
      token,
    });
  }
}
