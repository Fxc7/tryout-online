import path from 'path';
import crypto from 'crypto';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import memoryStore from 'memorystore';
import serveFavicon from 'serve-favicon';
import expressEjsLayouts from 'express-ejs-layouts';
import passport from 'passport';
import helmet from 'helmet';
import connectFlash from 'connect-flash';
import { rateLimit } from 'express-rate-limit';

import { Configs } from '#database/models.js';
import csrfMiddleware from '#root/middleware/csrfMiddleware.js';

const rateLimiter = rateLimit({
   windowMs: 1 * 60 * 1000,
   max: 100,
   message: 'Rate limit exceeded',
   standardHeaders: true,
   legacyHeaders: false,
});

const MemoryStore = memoryStore(expressSession);

const globalMiddleware = express();

globalMiddleware.set('trust proxy', 'loopback');
globalMiddleware.set('json spaces', 2);
globalMiddleware.set('view engine', 'ejs');

globalMiddleware.use(express.static(path.join(process.cwd(), 'assets')));
globalMiddleware.use(express.static(path.join(process.cwd(), 'build')));
globalMiddleware.use(serveFavicon(path.join(process.cwd(), 'assets', 'favicon', 'favicon.ico')));
globalMiddleware.use(cors());
globalMiddleware.use(cookieParser());
globalMiddleware.use(expressEjsLayouts);
globalMiddleware.use(compression({ level: 4 }));
globalMiddleware.use(helmet({ xPoweredBy: false, xXssProtection: false }));

globalMiddleware.use(expressSession({
   secret: 'secret',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 86400000 },
   store: new MemoryStore({ checkPeriod: 86400000 }),
}));

globalMiddleware.use(connectFlash());

globalMiddleware.use(express.json());
globalMiddleware.use(express.urlencoded({ extended: true }));
globalMiddleware.use(passport.initialize());
globalMiddleware.use(passport.session());
globalMiddleware.use(rateLimiter);

globalMiddleware.use((req, res, next) => {
   res.locals.nonce = Buffer.from(crypto.randomBytes(16)).toString('base64');
   res.setHeader("Content-Security-Policy", `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${req.protocol}://${req.headers.host} https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;`);
   // @ts-ignore
   req.flash = (type, message, options = { footer: cachedWebsite.title, position: 'center', timer: 3000 }) => {
      // @ts-ignore
      req.session.flash = { type, message, options };
   };
   // @ts-ignore
   res.locals.flashMessage = req.session.flash;
   // @ts-ignore
   req.session.flash = null;
   next();
});
globalMiddleware.use(csrfMiddleware);

let cachedWebsite = null;

globalMiddleware.use(async (req, res, next) => {
   if (!cachedWebsite) {
      const configs = await Configs.findOne({ raw: true });
      if (configs) {
         cachedWebsite = configs;
      }
   }
   res.locals.csrfToken = req.csrfToken();
   res.locals.base_url = `${req.protocol}://${req.headers.host}`;
   res.locals.page = null;
   res.locals.meta_website = cachedWebsite;
   res.locals.user = req.user || null;
   next();
});


export default globalMiddleware;