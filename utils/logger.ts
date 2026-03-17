function timestamp(): string {
  return new Date().toISOString();
}

export const log = {
  info: (message: string): void => {
    console.log(`[INFO ${timestamp()}] ${message}`);
  },
  warn: (message: string): void => {
    console.warn(`[WARN ${timestamp()}] ${message}`);
  },
  error: (message: string): void => {
    console.error(`[ERROR ${timestamp()}] ${message}`);
  },
};
