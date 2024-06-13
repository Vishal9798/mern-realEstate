import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; //install bcryptjs package
import { errorHandler } from '../utils/error.js';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // for encrypting password in db
    const newUser = new User({ username, email, password:hashedPassword });


    //so that we can see the error message of duplicate email and username to the client
    try{
      await newUser.save();
      res.status(201).json('user created');
    } catch(error){
      // next(errorHandler(440,'error created by me')); custom error by me
      next(error);
    }
   
  };