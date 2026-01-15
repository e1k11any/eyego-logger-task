import { Request, Response } from 'express';
import { KafkaProducer } from '../../../infrastructure/messaging/kafka/KafkaProducer';
import { IngestLog } from '../../../application/use-cases/IngestLog';
import { RetrieveLogs } from '../../../application/use-cases/RetrieveLogs';
import { MongoLogRepository } from '../../../infrastructure/persistence/mongo/MongoLogRepository';

export class LogController {
  private producer: KafkaProducer;

  constructor() {
    this.producer = new KafkaProducer();
    this.producer.connect();
  }

  ingest = async (req: Request, res: Response) => {
    const { userId, action, metadata } = req.body;

    const useCase = new IngestLog(this.producer);

    await useCase.execute({ userId, action, metadata });

    res.status(202).json({ status: 'queued', message: 'Log received' });
  };

  read = async (req: Request, res: Response) => {
    const userId = req.query.userId as string | null;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const useCase = new RetrieveLogs(new MongoLogRepository());

    const logs = await useCase.execute(userId, page, limit);
    res.status(200).json({
      status: 'success',
      results: logs.length,
      page: page,
      data: logs,
    });
  };
}
