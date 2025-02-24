import express from 'express';

const app = express.Router();

app.get('/register', (req, res) => {
   return res.render('authentication/register', {
      layout: 'layouts/index'
   });
});

app.get('/login', (req, res) => {
   return res.render('authentication/login', {
      layout: 'layouts/index'
   });
});

export default app;