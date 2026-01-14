import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { LogEntry } from './../../domain/entities/LogEntry';

export class SaveLog {
  constructor(private logRepository: ILogRepository) {}

  async execute(logEntry: LogEntry): Promise<void> {
    await this.logRepository.save(logEntry);
  }
}
