import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class MysqlTypeormConfigService implements TypeOrmOptionsFactory {
  private SOURCE_PATH = resolve(__dirname, '..', 'src');

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '4DMINroot',
      database: 'drug_store',
      entities: [resolve(this.SOURCE_PATH + '/**/*.entity.ts')],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
