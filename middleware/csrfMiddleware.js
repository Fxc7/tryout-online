import csrf from 'csurf';

const csrfMiddleware = csrf({ cookie: true });

export default (req, res, next) => {
   csrfMiddleware(req, res, (error) => {
      if (error) {
         if (error.code === 'EBADCSRFTOKEN') {
            req.flash('error', 'Token CSRF tidak valid, silakan refresh halaman ini dan coba lagi.');
            return res.redirect(req.headers.referer || '/');
         }
         return next(error);
      }
      res.locals.csrfToken = req.csrfToken();
      next();
   });
};