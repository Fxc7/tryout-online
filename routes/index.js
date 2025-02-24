import express from 'express';

import Api from '#routes/api.js';
import Users from '#routes/users.js';
import Dashboard from '#routes/dashboard.js';
import { Configs, Reviews } from '#root/database/models.js';

const app = express.Router();

app.use('/api', Api);
app.use('/users', Users);
app.use('/dashboard', Dashboard);

app.get('/', async (req, res) => {
   try {
      const testimonials = await Reviews.findAll({ raw: true });
      const configs = await Configs.findOne({ raw: true });
      return res.render('home/index', {
         meta_website: configs,
         // @ts-ignore
         testimonials: JSON.stringify(testimonials.filter((item) => item.display === 1)),
         layout: 'layouts/index'
      });
   } catch (error) {
      return res.send(error);
   }
});

export default app;