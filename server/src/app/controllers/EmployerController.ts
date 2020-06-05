import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import IController from './IController';
import UserRepository from '../repositories/UserRepository';
import RatingRepository from '../repositories/RatingRepository';
import JobVacancyRepository from '../repositories/JobVacancyRepository';

const cities: any[] = require('../data/cities.json');

export default class EmployerController extends IController {
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query;

    const users = await UserRepository.find({
      where: { employer: true },
      limit: 10 * Number(page),
      offset: (Number(page) - 1) * 10,
      join: [
        {
          repo: JobVacancyRepository,
          on: { employer_id: 'user.id' },
          as: 'jobs',
          type: 'many',
        },
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    res.json({ users });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id, employer: true },
      join: [
        {
          repo: JobVacancyRepository,
          on: { employer_id: 'user.id' },
          as: 'jobs',
          type: 'many',
        },
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    res.json({ user });
  }

  async store(req: Request, res: Response) {
    const { name, email, password, cnpj, phone, postalCode, address, state, city, neighborhood, ibgeCode } = req.body;
    const { filename } = req.file;

    const userExists = await UserRepository.findOne({
      attrs: ['id', 'email'],
      where: { email, employer: true },
    });

    if (userExists) {
      res.status(400).json({ error: 'Email already in use', field: 'email' });
      return;
    }

    const microregion = cities.find(c => c.id.toString() === ibgeCode).microrregiao;

    if (!microregion) {
      res.status(400).json({ error: { message: 'City does not exists', field: 'ibgeCode' } });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await UserRepository.create({
      employer: true,
      name,
      email,
      password: passwordHash,
      fiscal_code: cnpj,
      phone,
      image_url: filename,
      postal_code: postalCode,
      city,
      state,
      address,
      neighborhood,
      microregion_id: microregion.id,
    });

    res.status(201).json({ user });
  }

  async update(req: Request, res: Response) {
    const { userId } = res.locals;
    const { about } = req.body;

    const updated: any = {};

    if (about) {
      updated.about = await UserRepository.update({
        set: {
          about,
        },
        where: { id: userId },
      });
    }

    res.status(200).json({ updated });
  }

  async destroy(req: Request, res: Response) {
    const { userId } = res.locals;
    const { id } = req.params;

    if (id !== userId) {
      res.status(401).json({ error: { message: 'Operation not allowed', field: 'id' } });
      return;
    }

    const deleted = await UserRepository.delete({
      where: { id: Number(id), employer: true },
    });

    res.json({ deleted });
  }
}
