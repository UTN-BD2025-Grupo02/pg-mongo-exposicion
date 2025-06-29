import { DataSource } from 'typeorm';
import { DB_ACCESS } from './env';
import { entities } from '../../entities';

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_ACCESS.DB_HOST,
  port: DB_ACCESS.DB_PORT,
  username: DB_ACCESS.DB_USERNAME,
  password: DB_ACCESS.DB_PASSWORD,
  database: DB_ACCESS.DB_DATABASE,
  entities: [...entities],
  synchronize: false,
  ssl: DB_ACCESS.DB_SSL
})