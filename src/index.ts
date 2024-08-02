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

