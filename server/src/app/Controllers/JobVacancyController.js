import JobVacancyRepository from '../Repositories/JobVacancyRepository';
import JobServices from '../../services/Jobs';

export default class JobVacancyController {
  static async index(req, res) {
    const { user, microregion, date, local } = req.query;

    if (user && !date && !microregion && !local) {
      const jobVacancies = await JobVacancyRepository.find({
        where: { employer_id: user },
      });

      return res.status(200).json({ jobVacancies });
    }

    const jobs = JobServices.filterJobs({ date, microregion, local });

    return res.status(200).json({ jobVacancies: jobs });
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
