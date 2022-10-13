import { Module } from '@nestjs/common';
import { MysqlTypeormConfigService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlTypeormConfigService,
    }),
  ],
})
export class DatabaseModule {
  private readonly connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
}
