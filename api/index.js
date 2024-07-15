import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // first import the dotenv package(required for environment variables)
import userRouter from './routes/user.route.js';  // import the userRouter
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser'; // so that data can be accessed from cookie
import  listingRouter  from './routes/listing.route.js';
import path from 'path';  // for deploying

dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log("Successfully connected to MongoDB.");
}).catch(err => {
  console.error("Connection error", err.message);
});

const _dirname = path.resolve();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}
);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(_dirname, '/client/dist')))  // for deploying

app.get('*', (req,res)=>{
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html')); // for deploying
})
//creating middleware for error handling
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode:statusCode,
    message:message,
  });
});