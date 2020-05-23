import bcrypt from 'bcryptjs';

import UserRepository from '../Repositories/UserRepository';
import JobVacancyRepository from '../Repositories/JobVacancyRepository';

import cities from '../Data/cities';

export default class EmployerController {
  static async index(req, res) {
    const { page = 1 } = req.query;

    const users = await UserRepository.find({
      where: { employer: true },
      limit: 10 * page,
      offset: (page - 1) * 10,
      join: [
        {
          repo: JobVacancyRepository,
          on: { employer_id: 'user.id' },
          as: 'jobs',
          type: 'many',
        },
      ],
    });

    return res.json({ users });
  }

  static async show(req, res) {
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
      ],
    });

    return res.json({ user });
  }

  static async store(req, res) {
    const { name, email, password, cnpj, phone, postalCode, address, state, city, neighborhood, ibgeCode } = req.body;
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

    return res.status(201).json({ user });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: { message: 'Operation not allowed', field: 'id' } });
    }

    const deleted = await UserRepository.delete({
      where: { id: Number(id), employer: true },
    });

    return res.json({ deleted });
  }
}
