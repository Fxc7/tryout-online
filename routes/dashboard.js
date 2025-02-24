import express from 'express';

import { Users } from '#database/models.js';

const app = express.Router();

app.use((req, res, next) => {
   res.locals.baseUrl = req.baseUrl;
   res.locals.users = {};
   next();
});

app.get('/', async (req, res) => {
   try {
      const users = await Users.findOne({
         raw: true, where: {
            // @ts-ignore
            id: req.user?.id || 0
         }
      });
      return res.render('dashboard/index', {
         page: 'dashboard',
         user: users,
         usersLength: await Users.count(),
         layout: 'layouts/dashboard'
      });
   } catch (error) {
      return res.send(error);
   }
});

app.route('/edit-profile').get(async (req, res) => {
   try {
      const users = await Users.findOne({
         raw: true, where: {
            // @ts-ignore
            id: req.user?.id || 0
         }
      });
      return res.render('dashboard/profile', {
         page: 'profile',
         user: users,
         layout: 'layouts/dashboard'
      });
   } catch (error) {
      console.error(error);
      return res.send(error);
   }
}).post(async (req, res) => {
   try {
      const user = await Users.findOne({
         where: {
            id: +req.body.id
         },
         raw: true
      });
      req.body.phone = req.body.phone.replace(/[^\d]/g, '').toString();
      await Users.update({ ...user, ...req.body, updatedAt: new Date() }, { where: { id: +req.body.id } });
      req.flash('success', 'Successfully update profile');
      return res.redirect(req.baseUrl + req.url);
   } catch (error) {
      console.error(error);
      req.flash('error', 'Gagal melakukan update profile');
      return res.redirect(req.baseUrl + req.url);
   }
});

app.route('/users').get(async (req, res) => {
   try {
      const users = await Users.findAll({ raw: true });
      const user = await Users.findOne({
         raw: true, where: {
            // @ts-ignore
            id: req.user?.id || 0
         }
      });
      return res.render('dashboard/index', {
         page: 'users',
         users: users,
         user,
         usersLength: await Users.count(),
         layout: 'layouts/dashboard'
      });
   } catch (error) {
      return res.send(error);
   }
}).post(async (req, res) => {
   try {
      if (req.body.action === 'delete') {
         const deleted = await Users.destroy({
            where: { id: +req.body.id }
         });
         if (!deleted) {
            req.flash('error', 'User tidak ditemukan');
            return res.redirect(req.baseUrl + req.url);
         }
         req.flash('success', 'Successfully deleted user');
         return res.redirect(req.baseUrl + req.url);
      }
   } catch (error) {
      console.error(error);
      req.flash('error', 'Gagal menghapus user');
      return res.redirect(req.baseUrl + req.url);
   }
});

app.get('/kelola-soal', async (req, res) => {
   try {
      const users = await Users.findOne({
         raw: true, where: {
            // @ts-ignore
            id: req.user?.id || 0
         }
      });
      return res.render('dashboard/index', {
         page: req.query.type.toString().toLowerCase(),
         user: users,
         usersLength: await Users.count(),
         layout: 'layouts/dashboard'
      });
   } catch (error) {
      return res.send(error);
   }
});

export default app;