import { Kafka } from 'kafkajs';
import { MongoLogRepository } from '../../infrastructure/persistence/mongo/MongoLogRepository';
import { LogEntry } from '../../domain/entities/LogEntry';
import { SaveLog } from '../../application/use-cases/SaveLog';

export const runLogConsumer = async () => {
  const kafka = new Kafka({
    clientId: 'eyego-worker',
    brokers: ['127.0.0.1:9092'],
  });

  const comsumer = kafka.consumer({ groupId: 'log-processing-group' });

  await comsumer.connect();
  await comsumer.subscribe({ topic: 'logs-topic', fromBeginning: true });

  console.log('Log Consumer is running and listening for messages...');

  await comsumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const rawData = JSON.parse(message.value.toString());
      console.log(rawData);

      console.log(`📥 [Worker] Received log for user: ${rawData.userId}`);

      const useCase = new SaveLog(new MongoLogRepository());

      const logEntry = new LogEntry(
        null,
        rawData.userId,
        rawData.action,
        new Date(rawData.timestamp),
        rawData.metadata
      );

      await useCase.execute(logEntry);
      console.log(`✅ [Worker] Log saved for user: ${rawData.userId}`);
    },
  });
};
