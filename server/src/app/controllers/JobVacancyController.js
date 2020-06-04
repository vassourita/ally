import UserRepository from '../repositories/UserRepository';
import ProposalRepository from '../repositories/ProposalRepository';
import KnowledgeRepository from '../repositories/KnowledgeRepository';
import JobVacancyRepository from '../repositories/JobVacancyRepository';
import KnowledgeTypeRepository from '../repositories/KnowledgeTypeRepository';

export default class JobVacancyController {
  static async index(req, res) {
    const { userId } = req;

    const jobs = await JobVacancyRepository.find({
      where: { employer_id: userId },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'proposals',
          type: 'many',
          join: [
            {
              repo: UserRepository,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.status(200).json({ jobs });
  }

  static async show(req, res) {
    const { id } = req.params;

    const job = await JobVacancyRepository.findOne({
      where: { id },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'proposals',
          type: 'many',
          join: [
            {
              repo: UserRepository,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.status(200).json({ job });
  }

  static async store(req, res) {
    const { userId } = req;
    const { name, description, amount, local, knowledges } = req.body;

    const newJob = await JobVacancyRepository.create({
      name,
      local,
      amount,
      description,
      employer_id: userId,
    });

    knowledges.forEach(async knowledge => {
      await KnowledgeRepository.create(
        {
          knowledge_type_id: knowledge.typeId,
          name: knowledge.name,
          differential: knowledge.differential,
          job_vacancy_id: newJob.id,
        },
        false,
      );
    });

    const job = await JobVacancyRepository.findOne({
      where: { id: newJob.id },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'proposals',
          type: 'many',
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.status(201).json({ job });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { amount, local, removeKnowledge, addKnowledge } = req.body;

    const updated = {};

    if (amount) {
      updated.amount = await JobVacancyRepository.update({
        set: { amount },
        where: { id },
      });
    }

    if (local) {
      updated.local = await JobVacancyRepository.update({
        set: { local },
        where: { id },
      });
    }

    if (removeKnowledge) {
      updated.removeKnowledge = await KnowledgeRepository.delete({
        where: { id: Number(removeKnowledge) },
      });
    }

    if (addKnowledge) {
      updated.addKnowledge = addKnowledge.filter(async knowledge => {
        return !!(await KnowledgeRepository.create(
          {
            knowledge_type_id: knowledge.typeId,
            name: knowledge.name,
            differential: knowledge.differential,
            job_vacancy_id: id,
          },
          false,
        ));
      });
    }

    const job = await JobVacancyRepository.findOne({
      where: { id },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'proposals',
          type: 'many',
        },
        {
          repo: KnowledgeRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
          as: 'knowledges',
          type: 'many',
          join: [
            {
              repo: KnowledgeTypeRepository,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    return res.status(200).json({ job, updated });
  }

  static async destroy(req, res) {
    const { id } = req.params;

    const deleted = await JobVacancyRepository.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ deleted });
  }
}
