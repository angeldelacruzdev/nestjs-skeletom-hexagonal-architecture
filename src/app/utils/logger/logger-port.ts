export interface LoggerPort {
    log(message: string, context?: string): void;
    error(message: string, trace?: string, context?: string): void;
    // Otros métodos de logging si es necesario
}
