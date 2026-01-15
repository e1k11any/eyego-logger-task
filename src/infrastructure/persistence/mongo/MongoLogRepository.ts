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

  async find(filters: any, page: number, limit: number): Promise<LogEntry[]> {
    const skip = (page - 1) * limit;
    const logsDocuments = await LogModel.find(filters)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
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
