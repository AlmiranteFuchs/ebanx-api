import { DataSource } from 'typeorm';
import { User } from './entity/User';

// Create a new DataSource instance
export const AppDataSource = new DataSource({
    type: 'sqlite', // Change this to your database type (e.g., 'mysql', 'postgres', etc.)
    database: './database.sqlite',
    entities: [User], // List of entities
    synchronize: true, // Automatically create the database schema
    migrations: ['src/migration/**/*.ts'], // Path to migration files
    logging: false, // Enable logging of SQL queries
});

