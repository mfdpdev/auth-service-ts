import 'reflect-metadata'
import { DataSource } from "typeorm";
import { TypeOrmPinoLogger } from "./typeorm-logger";
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: process.env.ENV === 'production' 
    ? ['dist/entities/**/*.js'] 
    : ['src/entities/**/*.ts'],
  migrations: process.env.ENV === 'production' 
    ? ['dist/migrations/**/*.js'] 
    : ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
  logger: new TypeOrmPinoLogger(),
})
