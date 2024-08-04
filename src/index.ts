import { ExpressApp } from './app';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { User } from './entity/User';
import { AppDataSource } from './data-source';

dotenv.config();


console.log(" - Project Loaded - ");

// Set the port
const port: number = parseInt(process.env.PORT as string) || 3000;

// Initialize the express app
const app = new ExpressApp().server;
app.listen(port, () => {
  console.log(` - Express App Initialized on: http://localhost:${port} - `);
});

async function initialize_database() {
  // Initialize the DataSource
  await AppDataSource.initialize();

  // Handle SIGINT signal (Ctrl+C), close the connection and exit
  process.on('SIGINT', async () => {
    await AppDataSource.destroy();
    process.exit(0);
  });


  // // Get the User repository
  // const userRepository = AppDataSource.getRepository(User);

  // // Create a new user
  // const user = new User();
  // user.name = 'John Doe';
  // user.email = 'john.doe@example.com';

  // await userRepository.save(user);

  // // Fetch all users
  // const users = await userRepository.find();
  // console.log(users);

}


async function main() {

}

main().catch(error => console.log('Error:', error));