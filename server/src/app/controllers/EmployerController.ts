import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';

import cities from '@database/cities.json';

import { IController } from '@controllers/IController';

export class EmployerController implements IController {
  constructor(private readonly repoService: RepositoryService) {}

  async index(req: Request, res: Response): Promise<void> {
    const { page = 1 } = req.query;

    const users = await this.repoService.users.find({
      where: { employer: true },
      limit: 10 * Number(page),
      offset: (Number(page) - 1) * 10,
      join: [
        {
          repo: this.repoService.jobVacancies,
          on: { employer_id: 'user.id' },
          as: 'jobs',
          type: 'many',
        },
      ],
    });

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.repoService.users.findOne({
      where: { id: Number(id), employer: true },
      join: [
        {
          repo: this.repoService.jobVacancies,
          on: { employer_id: 'user.id' },
          as: 'jobs',
          type: 'many',
        },
      ],
    });

    res.json({ user });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { name, email, password, cnpj, phone, postalCode, address, state, city, neighborhood, ibgeCode } = req.body;
    const { filename } = req.file;

    const userExists = await this.repoService.users.findOne({
      attrs: ['id', 'email'],
      where: { email, employer: true },
    });

    if (userExists) {
      res.status(400).json({ error: 'Email already in use', field: 'email' });
      return;
    }

    const microregion = cities.find((c: any) => c.id.toString() === ibgeCode).microrregiao;

    if (!microregion) {
      res.status(400).json({ error: { message: 'City does not exists', field: 'ibgeCode' } });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await this.repoService.users.create({
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

  async update(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { about } = req.body;

    const updated: any = {};

    if (about) {
      updated.about = await this.repoService.users.update({
        set: {
          about,
        },
        where: { id: userId },
      });
    }

    res.status(200).json({ updated });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { id } = req.params;

    if (id !== userId) {
      res.status(401).json({ error: { message: 'Operation not allowed', field: 'id' } });
      return;
    }

    const deleted = await this.repoService.users.delete({
      where: { id: Number(id), employer: true },
    });

    res.json({ deleted });
  }
}
