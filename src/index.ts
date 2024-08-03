import { ExpressApp } from './app';
import dotenv from 'dotenv';

dotenv.config();


console.log(" - Project Loaded - ");

// Set the port
const port: number = parseInt(process.env.PORT as string) || 3000;

// Initialize the express app
const app = new ExpressApp().server;
app.listen(port, () => {
  console.log(` - Express App Initialized on: http://localhost:${port} - `);
});

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection().then(async connection => {
  const userRepository = connection.getRepository(User);

  // Create a new user
  const user = new User();
  user.name = 'John Doe';
  user.email = 'john.doe@example.com';

  await userRepository.save(user);

  // Fetch all users
  const users = await userRepository.find();
  console.log(users);
}).catch(error => console.log(error));