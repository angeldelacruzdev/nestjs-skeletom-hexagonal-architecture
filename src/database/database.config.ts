import { Module } from '@nestjs/common';
import { SlonikModule } from 'nestjs-slonik';

@Module({
  imports: [
    SlonikModule.forRootAsync({
      useFactory: () => ({
        connectionUri: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
      }),
    }),
  ],
})
export class SlonikRootModule {}
