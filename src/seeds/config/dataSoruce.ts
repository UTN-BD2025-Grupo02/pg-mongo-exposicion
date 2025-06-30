import { DataSource } from 'typeorm';
import { MONGO } from './env';
import { entities } from '../../entities';

export const dataSource = new DataSource({
  type: "mongodb",
  host: MONGO.MONGO_HOST,
  port: MONGO.MONGO_PORT,
  username: MONGO.MONGO_USERNAME,
  password: MONGO.MONGO_PASSWORD,
  database: MONGO.MONGO_DATABASE,
  entities: [...entities],
  synchronize: false,
  ssl: MONGO.MONGO_SSL
})