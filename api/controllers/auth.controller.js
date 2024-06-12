import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; //install bcryptjs package

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // for encrypting password in db
    const newUser = new User({ username, email, password:hashedPassword });


    //so that we can see the error message of duplicate email and username to the client
    try{
      await newUser.save();
      res.status(201).json('user created');
    } catch(error){
       res.status(500).json(error.message);   
    }
   
  };