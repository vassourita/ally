import bcrypt from 'bcryptjs';

import UserRepository from '../Repositories/UserRepository';
import KnowledgeRepository from '../Repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '../Repositories/KnowledgeTypeRepository';

import cities from '../Data/cities';

export default class EmployerController {
  static async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id },
      join: [
        {
          model: KnowledgeRepository,
          type: 'array',
          on: { user_id: 'id' },
          join: [
            {
              model: KnowledgeTypeRepository,
              as: 'type',
              type: 'single',
              on: { id: 'knowledgeRepository_type_id' },
            },
          ],
        },
      ],
      limit: 10,
    });

    if (!user) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.json(user);
  }

  static async store(req, res) {
    const { data } = req.body;

    const userExists = await UserRepository.findOne({
      attrs: ['id'],
      where: { email: data.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const { filename } = req.file;

    const microregion = cities.filter(city => city.id === data.ibgeCode)[0].microrregiao;

    const passwordHash = await bcrypt.hash(data.password, 8);

    const user = await UserRepository.create({
      employer: true,
      name: data.name,
      email: data.email,
      password: passwordHash,
      fiscal_code: data.cnpj,
      phone: data.phone,
      image_url: filename,
      postal_code: data.cep,
      city: data.city,
      state: data.state,
      address: data.address,
      neighborhood: data.neighborhood,
      microregion_id: microregion.id,
    });

    return res.status(201).json(user);
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id },
    });

    return res.json({ deleted });
  }
}
