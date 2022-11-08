import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class MysqlTypeormConfigService implements TypeOrmOptionsFactory {
  private SOURCE_PATH = resolve(__dirname, '..', 'src');

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [resolve(this.SOURCE_PATH + '/**/*.entity.ts')],
      synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
      autoLoadEntities: !!process.env.TYPEORM_AUTOLOAD_ENTITIES,
    };
  }
}
