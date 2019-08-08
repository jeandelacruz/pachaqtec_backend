import { DatabaseType } from 'typeorm';
import './env';

const DatabaseConfig = {
    type: process.env.DB_TYPE as DatabaseType,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOG === 'true',
    entities: [process.env.DB_ENTITIES],
    migrations: [process.env.DB_MIGRATION],
    migrationsTableName: process.env.TABLE_MIGRATION,
    subscribers: [process.env.DB_SUBSCRIBER],
    cli: {
        entitiesDir: process.env.DB_SRC_ENTITIES,
        migrationsDir: process.env.DB_SRC_MIGRATION,
        subscribersDir: process.env.DB_SRC_SUBSCRIBER,
    },
};

export = DatabaseConfig;
