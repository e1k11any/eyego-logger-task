export interface IngestLogDTO {
  userId: string;
  action: string;
  metadata?: Record<string, any>;
}
