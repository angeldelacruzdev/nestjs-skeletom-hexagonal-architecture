import { Module } from '@nestjs/common';
import { LoggerAdapter } from './logger.adapter';


@Module({
    providers: [
        {
            provide: 'LoggerPort',
            useClass: LoggerAdapter,
        },
    ],
    exports: ['LoggerPort'],
})
export class LoggingModule { }
