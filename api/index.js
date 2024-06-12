import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // first import the dotenv package(required for environment variables)
import userRouter from './routes/user.route.js';  // import the userRouter
import authRouter from './routes/auth.route.js';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log("Successfully connected to MongoDB.");
}).catch(err => {
  console.error("Connection error", err.message);
});




const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}
);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);