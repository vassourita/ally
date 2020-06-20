import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { IController } from '@controllers/IController';
import UserRepository from '@repositories/UserRepository';
import KnowledgeRepository from '@repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '@repositories/KnowledgeTypeRepository';

import cities from '@database/cities.json';

export default class UserController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { page = 1 } = req.query;

    const users = await UserRepository.find({
      where: { employer: false },
      limit: 10 * Number(page),
      offset: (Number(page) - 1) * 10,
      join: [
        {
          repo: KnowledgeRepository,
          attrs: ['id', 'name'],
          on: { user_id: 'user.id' },
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.json({ users });
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id, employer: false },
      join: [
        {
          repo: KnowledgeRepository,
          on: { user_id: 'user.id' },
          type: 'many',
          attrs: ['id', 'name'],
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.json({ user });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { name, email, password, cpf, phone, postalCode, address, state, city, neighborhood, ibgeCode } = req.body;
    const { filename } = req.file;

    const userExists = await UserRepository.findOne({
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

    const user = await UserRepository.create({
      employer: false,
      name,
      email,
      password: passwordHash,
      fiscal_code: cpf,
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
    const { about, removeKnowledge, addKnowledge } = req.body;

    const updated: any = {};

    if (about) {
      updated.about = await UserRepository.update({
        set: {
          about,
        },
        where: { id: Number(userId) },
      });
    }

    if (removeKnowledge) {
      updated.removeKnowledge = await KnowledgeRepository.delete({
        where: { id: Number(removeKnowledge) },
      });
    }

    if (addKnowledge) {
      updated.addKnowledge = addKnowledge.filter(async (knowledge: any) => {
        return !!(await KnowledgeRepository.create(
          {
            knowledge_type_id: knowledge.typeId,
            name: knowledge.name,
            user_id: userId,
          },
          false,
        ));
      });
    }

    const user = await UserRepository.findOne({
      where: { id: userId },
      join: [
        {
          repo: KnowledgeRepository,
          attrs: ['id', 'name'],
          on: { user_id: 'user.id' },
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.json({ user, updated });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { id } = req.params;

    if (id !== userId) {
      res.status(401).json({ error: 'Operation not allowed' });
      return;
    }

    const deleted = await UserRepository.delete({
      where: { id: Number(id), employer: false },
    });

    res.status(200).json({ deleted });
  }
}
