import { LogEntry } from '../entities/LogEntry';

export interface IMessageProducer {
  connect(): Promise<void>;
  send(log: LogEntry): Promise<void>;
  disconnect(): Promise<void>;
}
