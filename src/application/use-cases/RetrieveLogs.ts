import { LogEntry } from '../../domain/entities/LogEntry';
import { ILogRepository } from '../../domain/repositories/ILogRepository';

export class RetrieveLogs {
  constructor(private logRepository: ILogRepository) {}

  async execute(
    userId: string | null,
    page: number = 1,
    limit: number = 10
  ): Promise<LogEntry[]> {
    const filters: any = {};
    if (userId) {
      filters.userId = userId;
    }

    return await this.logRepository.find(filters, page, limit);
  }
}
