import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/UserRepository';
import RatingRepository from '../repositories/RatingRepository';
import KnowledgeRepository from '../repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '../repositories/KnowledgeTypeRepository';

import cities from '../data/cities';

export default class UserController {
  static async index(req, res) {
    const { page = 1 } = req.query;

    const users = await UserRepository.find({
      where: { employer: false },
      limit: 10 * page,
      offset: (page - 1) * 10,
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
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    return res.json({ users });
  }

  static async show(req, res) {
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
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    return res.status(200).json({ user });
  }

  static async store(req, res) {
    const { name, email, password, cpf, phone, postalCode, address, state, city, neighborhood, ibgeCode } = req.body;
    const { filename } = req.file;

    const userExists = await UserRepository.findOne({
      attrs: ['id', 'email'],
      where: { email, employer: true },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use', field: 'email' });
    }

    const microregion = cities.find(c => c.id.toString() === ibgeCode).microrregiao;

    if (!microregion) {
      return res.status(400).json({ error: { message: 'City does not exists', field: 'ibgeCode' } });
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

    return res.status(201).json({ user });
  }

  static async update(req, res) {
    const { userId } = req;
    const { about, removeKnowledge, addKnowledge } = req.body;

    const updated = {};

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
      updated.addKnowledge = addKnowledge.filter(async knowledge => {
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
        {
          repo: RatingRepository,
          on: { target_id: 'user.id' },
          type: 'count',
          as: 'likes',
        },
      ],
    });

    return res.status(200).json({ user, updated });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id: Number(id), employer: false },
    });

    return res.status(200).json({ deleted });
  }
}
