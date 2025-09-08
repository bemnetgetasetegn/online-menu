import express from 'express';
import dotenv from 'dotenv';
import mySqlConnection from './config/db.js';
import cors from 'cors'
import router from './Router/route.js';

dotenv.config()

const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: '*', // Allows all origins
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware to parse JSON (increase limit for safety if needed)
app.use(express.json());

// Optional: parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(port, async () => {
    await mySqlConnection.query('SELECT 1');
    console.log(`Server is running on port ${port} and DB is connected`);

})