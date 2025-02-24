import express from 'express';

import { Configs, Reviews } from '#root/database/models.js';

const app = express.Router();

app.post('/modified-profile', async (req, res) => {
   try {
      req.flash('success', 'Successfully modified');
      return res.redirect('/dashboard/edit-profile');
   } catch (error) {
      console.error(error);
      req.flash('error', error.message);
      return res.redirect('/dashboard/edit-profile');
   }
});

export default app;