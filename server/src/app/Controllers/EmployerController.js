import bcrypt from 'bcryptjs';

import UserRepository from '../Repositories/UserRepository';

import cities from '../Data/cities';

export default class EmployerController {
  static async show(req, res) {
    const { id } = req.userId;

    const user = await UserRepository.findOne({
      where: { id, employer: true },
    });

    return res.json({ user });
  }

  static async store(req, res) {
    const { name, email, password, cnpj, phone, location } = req.body;
    const { postalCode, address, state, city, neighborhood, ibgeCode } = JSON.parse(location);

    const userExists = await UserRepository.findOne({
      attrs: ['id'],
      where: { email, employer: true },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const { filename } = req.file;

    const microregion = cities.find(c => c.id.toString() === ibgeCode).microrregiao;

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
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    const deleted = await UserRepository.delete({
      where: { id, employer: true },
    });

    return res.json({ deleted });
  }
}
