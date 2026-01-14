import { LogEntry } from '../../../domain/entities/LogEntry';
import { ILogRepository } from '../../../domain/repositories/ILogRepository';
import { LogModel } from './schemas/LogSchema';

export class MongoLogRepository implements ILogRepository {
  async save(log: LogEntry): Promise<void> {
    await LogModel.create({
      userId: log.userId,
      action: log.action,
      timestamp: log.timestamp,
      metadata: log.metadata,
    });
  }

  async find(filters: any): Promise<LogEntry[]> {
    const logsDocuments = await LogModel.find(filters)
      .limit(50)
      .sort({ timestamp: -1 })
      .exec();

    return logsDocuments.map(
      (log) =>
        new LogEntry(
          log._id.toString(),
          log.userId,
          log.action,
          log.timestamp,
          log.metadata
        )
    );
  }
}
