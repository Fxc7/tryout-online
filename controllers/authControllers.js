import { User } from '#database/models.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ message: 'User not found' });

      // @ts-ignore
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

      // @ts-ignore
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};