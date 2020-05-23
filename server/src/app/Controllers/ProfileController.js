import UserRepository from '../Repositories/UserRepository';
import RatingRepository from '../Repositories/RatingRepository';

export default class ProfileController {
  static async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findOne({
      where: { id },
      join: [
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
}
