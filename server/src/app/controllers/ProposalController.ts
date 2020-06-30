import { Request, Response } from 'express';

import { RepositoryService } from '@services/RepositoryService';
import { WebSocketService } from '@services/WebSocketService';

import { IController } from '@controllers/IController';

export class ProposalController implements IController {
  constructor(
    private readonly repoService: RepositoryService,
    private readonly wsService: WebSocketService
  ) {}

  public index = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;

    const proposals = await this.repoService.proposals.find({
      where: { user_id: userId },
      join: [
        {
          repo: this.repoService.jobVacancies,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'job_vacancy.employer_id' },
              type: 'single',
              as: 'employer',
            },
          ],
        },
      ],
    });

    res.status(200).json({ proposals });
  }

  public store = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals;
    const { jobVacancyId } = req.body;

    const user = await this.repoService.users.findOne({
      where: { id: userId },
    });

    const insertId = await this.repoService.proposals.create(
      {
        user_id: userId,
        job_vacancy_id: jobVacancyId,
        status: 'awaiting',
      },
      false,
    );

    const proposal = await this.repoService.proposals.findOne({
      where: { id: insertId },
      join: [
        {
          repo: this.repoService.jobVacancies,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
        },
      ],
    });

    const notification = await this.repoService.notifications.create({
      user_id: proposal.job.employer_id,
      title: `Nova proposta em '${proposal.job.name}'`,
      description: `Você recebeu uma nova proposta de ${user.name} em sua vaga '${proposal.job.name}'`,
      link: `/vacancies/${proposal.job.id}`,
      is_read: false,
    });

    await this.wsService.sendNotification(proposal.job.employer_id.toString(), notification);

    res.status(201).json({ proposal });
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    const employerId = res.locals.userId;
    const proposalId = Number(req.params.id);
    const { status } = req.body;

    const proposal = await this.repoService.proposals.findOne({
      where: { id: Number(proposalId) },
      join: [
        {
          repo: this.repoService.jobVacancies,
          on: { id: 'proposal.job_vacancy_id' },
          type: 'single',
          as: 'job',
          join: [
            {
              repo: this.repoService.users,
              on: { id: 'job_vacancy.employer_id' },
              type: 'single',
              as: 'employer',
            },
          ],
        },
      ],
    });

    if (!proposal) {
      res.status(404).json({ error: { message: 'Proposal not found', field: 'id' } });
      return;
    }

    if (proposal.status !== 'awaiting') {
      res.status(401).json({ error: { message: 'Proposal is not waiting for approval', field: 'id' } });
      return;
    }

    if (![true, false].includes(status)) {
      res.status(401).json({ error: { message: 'Invalid status sent', field: 'status' } });
      return;
    }

    let chat = await this.repoService.chats.findOne({
      where: { employer_id: employerId, user_id: proposal.user_id },
    });

    if (!chat) {
      chat = await this.repoService.chats.create({
        employer_id: employerId,
        user_id: proposal.user_id,
      });
    }

    let title: string;
    let text: string;
    let link: string;
    if (status === true) {
      title = 'Proposta aceita';
      text = `Sua proposta para ${proposal.job.name} foi aceita! A empresa ${proposal.job.employer.name} entrará em contato.`;
      link = `/proposals/${proposalId}`;
      if (proposal.job.amount > 0) {
        await this.repoService.jobVacancies.update({
          set: { amount: '** = job_vacancy.amount - 1' as any },
          where: { id: proposal.job_vacancy_id }
        });
      }
      await this.repoService.proposals.update({
        set: { status: 'accepted' },
        where: { id: proposalId },
      });
    } else {
      title = 'Proposta negada';
      text = `Sua proposta para ${proposal.job.name} foi negada.`;
      link = `/proposals/${proposalId}`;
      await this.repoService.proposals.update({
        set: { status: 'denied' },
        where: { id: proposalId },
      });
    }

    const notification = await this.repoService.notifications.create({
      user_id: proposal.user_id,
      title,
      description: text,
      link,
      is_read: false,
    });

    await this.wsService.sendNotification(proposal.user_id.toString(), notification);

    res.status(201).json({ updated: true, chat });
  }

  public destroy = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const deleted = await this.repoService.proposals.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ deleted });
  }
}
