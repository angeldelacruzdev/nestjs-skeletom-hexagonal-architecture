export interface LoggerRepositoryPort {
  log(message: string): void;
  error(message: string): void;
  // Otros métodos según sea necesario...
}
