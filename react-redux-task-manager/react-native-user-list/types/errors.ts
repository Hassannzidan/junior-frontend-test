export type AppError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};
