import { IMessageProducer } from '../../domain/repositories/IMessageProducer';
import { IngestLogDTO } from '../dtos/IngestLogDTO';
import { LogEntry } from './../../domain/entities/LogEntry';

export class IngestLog {
  constructor(private producer: IMessageProducer) {}

  async execute(rawData: IngestLogDTO): Promise<void> {
    const log = new LogEntry(
      null,
      rawData.userId,
      rawData.action,
      new Date(),
      rawData.metadata
    );
    await this.producer.send(log);
  }
}
