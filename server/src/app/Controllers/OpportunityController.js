import JobService from '../../Services/JobService';

export default class OpportunitiesController {
  static async index(req, res) {
    const { microregion, days, local } = req.query;

    const jobs = await JobService.filterJobs({ days, microregion, local, userId: req.userId });

    return res.status(200).json({ jobs });
  }
}
