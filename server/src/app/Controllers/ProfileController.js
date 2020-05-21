import UserRepository from '../Repositories/UserRepository';

export default class ProfileController {
  static async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          field: 'id',
        },
      });
    }

    return res.status(200).json({ user });
  }
}
