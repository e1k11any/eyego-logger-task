export class LogEntry {
  constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public readonly action: string,
    public readonly timestamp: Date,
    public readonly metadata: Record<string, any> = {}
  ) {
    if (!userId) {
      throw new Error('LogEntry must have a userId');
    }
    if (!action) {
      throw new Error('LogEntry must have an action');
    }
  }
}
