import { LogEntry } from '../entities/LogEntry';

export interface ILogRepository {
  save(log: LogEntry): Promise<void>;
  find(filter: any, page: number, limit: number): Promise<LogEntry[]>;
}
