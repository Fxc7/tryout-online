import { User } from '#database/models.js';
import argon2 from 'argon2';

export const registerUser = async (req, res) => {
   try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await argon2.hash(password);

      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role: 'user',
         type,
      });

      res.status(201).json({ message: 'User registered successfully', user });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};