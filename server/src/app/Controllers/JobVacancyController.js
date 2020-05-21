import JobVacancyRepository from '../Repositories/JobVacancyRepository';

export default class JobVacancyController {
  static async index(req, res) {
    const { userId } = req;

    const jobVacancies = await JobVacancyRepository.find({
      where: { employer_id: userId },
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
