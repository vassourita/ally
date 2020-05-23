import JobVacancyRepository from '../Repositories/JobVacancyRepository';

export default class JobVacancyController {
  static async index(req, res) {
    const { userId } = req;

    const jobs = await JobVacancyRepository.find({
      where: { employer_id: userId },
    });

    return res.status(200).json({ jobs });
  }

  static async show(req, res) {
    const { id } = req.params;

    const job = await JobVacancyRepository.findOne({
      where: { id },
    });

    return res.status(200).json({ job });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    const deleted = await JobVacancyRepository.delete({
      where: { id },
    });

    return res.status(200).json({ deleted });
  }
}
