import { Request, Response } from 'express';

import { IController } from '@controllers/IController';

import JobVacancyRepository from '@repositories/JobVacancyRepository';
import KnowledgeRepository from '@repositories/KnowledgeRepository';
import KnowledgeTypeRepository from '@repositories/KnowledgeTypeRepository';
import ProposalRepository from '@repositories/ProposalRepository';
import UserRepository from '@repositories/UserRepository';

export default class JobVacancyController implements IController {
  async index(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    const jobs = await JobVacancyRepository.find({
      where: { employer_id: userId },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id', status: 'awaiting' },
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

    res.status(200).json({ jobs });
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const job = await JobVacancyRepository.findOne({
      where: { id: Number(id) },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id' },
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

    res.status(200).json({ job });
  }

  async store(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { name, description, amount, local, knowledges } = req.body;

    const newJob = await JobVacancyRepository.create({
      name,
      local,
      amount,
      description,
      employer_id: userId,
    });

    knowledges.forEach(async (knowledge: any) => {
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

    res.status(201).json({ job });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { amount, local, removeKnowledge, addKnowledge } = req.body;

    const updated: any = {};

    if (amount) {
      updated.amount = await JobVacancyRepository.update({
        set: { amount },
        where: { id: Number(id) },
      });
    }

    if (local) {
      updated.local = await JobVacancyRepository.update({
        set: { local },
        where: { id: Number(id) },
      });
    }

    if (removeKnowledge) {
      updated.removeKnowledge = await KnowledgeRepository.delete({
        where: { id: Number(removeKnowledge) },
      });
    }

    if (addKnowledge) {
      updated.addKnowledge = addKnowledge.filter(async (knowledge: any) => {
        return !!(await KnowledgeRepository.create(
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

    const job = await JobVacancyRepository.findOne({
      where: { id: Number(id) },
      join: [
        {
          repo: ProposalRepository,
          on: { job_vacancy_id: 'job_vacancy.id', status: 'awaiting' },
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

    res.status(200).json({ job, updated });
  }

  async destroy(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const deleted = await JobVacancyRepository.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ deleted });
  }
}
