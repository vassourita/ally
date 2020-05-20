import JobVacancyRepository from '../Repositories/JobVacancyRepository';

export default class ProfileController {
  static async index(req, res) {
    const { user, region, microregion } = req.query;

    const query = {};

    if (user) query.employer_id = Number(user);
    if (region !== undefined) query.region_only = !!region;
    if (microregion) query.microregion_id = microregion;

    const jobVacancies = await JobVacancyRepository.find({
      where: query,
    });

    return res.status(200).json({ jobVacancies });
  }

  static async show(req, res) {
    const { jobId } = req.params;

    const jobVacancy = await JobVacancyRepository.findOne({
      where: { id: jobId },
    });

    if (!jobVacancy) {
      return res.status(404).json({
        error: {
          message: 'Job Vacancy not found',
        },
      });
    }

    return res.status(200).json({ jobVacancy });
  }
}
