import { ExpressApp } from './app';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { User } from './entity/User';
import { AppDataSource } from './data-source';

dotenv.config();


async function initialize_database() {
  // Initialize the DataSource
  await AppDataSource.initialize();

  // Handle SIGINT signal (Ctrl+C), close the connection and exit
  process.on('SIGINT', async () => {
    await AppDataSource.destroy();
    process.exit(0);
  });

  console.log(" - Database Initialized - ");


}

async function init_express() {

  // Set the port
  const port: number = parseInt(process.env.PORT as string) || 3000;

  // Initialize the express app
  const app = new ExpressApp().server;
  app.listen(port, () => {
    console.log(` - Express App Initialized on: http://localhost:${port} - `);
  });
}


async function main() {
  await initialize_database();
  await init_express();
  console.log(" - Project Loaded - ");
}

main().catch(error => console.log('Error:', error));