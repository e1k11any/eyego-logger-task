import { Kafka, Producer } from 'kafkajs';
import { LogEntry } from '../../../domain/entities/LogEntry';
import { IMessageProducer } from '../../../domain/repositories/IMessageProducer';

export class KafkaProducer implements IMessageProducer {
  private kafka: Kafka;
  private producer: Producer;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'eyego-logger-api',
      brokers: ['127.0.0.1:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async send(log: LogEntry): Promise<void> {
    const message = {
      key: log.userId,
      value: JSON.stringify(log),
    };
    await this.producer.send({
      topic: 'logs-topic',
      messages: [message],
    });
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}
