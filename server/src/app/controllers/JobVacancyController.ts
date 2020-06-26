import { Request, Response } from 'express';

import { JobService } from '@services/JobService';
import { RepositoryService } from '@services/RepositoryService';

import { IController } from '@controllers/IController';

export class JobVacancyController implements IController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly jobService: JobService
  ) {}

  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const jobs = await this.repoService.jobVacancies.find({
      where: { employer_id: userId },
      join: [
        {
          repo: this.repoService.proposals,
          on: { job_vacancy_id: 'job_vacancy.id', status: 'awaiting' },
          type: 'many',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: this.repoService.knowledges,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.knowledgeTypes,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    const jobsWithMatches = await this.jobService.generateMatchData(jobs);

    res.status(200).json({ jobs: jobsWithMatches });
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const job = await this.repoService.jobVacancies.findOne({
      where: { id: Number(id) },
      join: [
        {
          repo: this.repoService.proposals,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: this.repoService.knowledges,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.knowledgeTypes,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.status(200).json({ job });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { name, description, amount, local, knowledges } = req.body;

    const newJob = await this.repoService.jobVacancies.create({
      name,
      local,
      amount,
      description,
      employer_id: userId,
    });

    knowledges.forEach(async (knowledge: any) => {
      await this.repoService.knowledges.create(
        {
          knowledge_type_id: knowledge.typeId,
          name: knowledge.name,
          differential: knowledge.differential,
          job_vacancy_id: newJob.id,
        },
        false,
      );
    });

    const job = await this.repoService.jobVacancies.findOne({
      where: { id: newJob.id },
      join: [
        {
          repo: this.repoService.proposals,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: this.repoService.knowledges,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.knowledgeTypes,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.status(201).json({ job });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { amount, local, removeKnowledge, addKnowledge } = req.body;

    const updated: any = {};

    if (amount) {
      updated.amount = await this.repoService.jobVacancies.update({
        set: { amount },
        where: { id: Number(id) },
      });
    }

    if (local) {
      updated.local = await this.repoService.jobVacancies.update({
        set: { local },
        where: { id: Number(id) },
      });
    }

    if (removeKnowledge) {
      updated.removeKnowledge = await this.repoService.knowledges.delete({
        where: { id: Number(removeKnowledge) },
      });
    }

    if (addKnowledge) {
      updated.addKnowledge = addKnowledge.filter(async (knowledge: any) => {
        return !!(await this.repoService.knowledges.create(
          {
            knowledge_type_id: knowledge.typeId,
            name: knowledge.name,
            differential: knowledge.differential,
            job_vacancy_id: Number(id),
          },
          false,
        ));
      });
    }

    const job = await this.repoService.jobVacancies.findOne({
      where: { id: Number(id) },
      join: [
        {
          repo: this.repoService.proposals,
          on: { job_vacancy_id: 'job_vacancy.id', status: 'awaiting' },
          type: 'many',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'proposal.user_id' },
              type: 'single',
              as: 'user',
            },
          ],
        },
        {
          repo: this.repoService.knowledges,
          on: { job_vacancy_id: 'job_vacancy.id' },
          type: 'many',
          join: [
            {
              repo: this.repoService.knowledgeTypes,
              on: { id: 'knowledge.knowledge_type_id' },
              as: 'type',
              type: 'single',
            },
          ],
        },
      ],
    });

    res.status(200).json({ job, updated });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const deleted = await this.repoService.jobVacancies.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ deleted });
  }
}
