import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
          ),
          transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                  utilities.format.nestLike('PharmacyNest', {
                    // options
                  }),
                ),
            }),
            new winston.transports.File({
                filename: './logs/app.log', //name of file where will be saved logging result
                level: 'info',
            }),
          ],
        }),
      ],
})
export class LoggerModule {}
