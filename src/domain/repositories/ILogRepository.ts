import { LogEntry } from '../entities/LogEntry';

export interface ILogRepository {
  save(log: LogEntry): Promise<void>;
  find(filters: any): Promise<LogEntry[]>;
}
