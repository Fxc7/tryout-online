import path from 'path';

import { sequelize } from '#database/models.js';
import IndexRoute from '#routes/index.js';

import router from '#middleware/globalMiddleware.js';

const port = process.env.PORT || 3000;

router.use(IndexRoute);

router.use((req, res) => {
   return res.sendFile(path.join(process.cwd(), 'views', '404.html'));
});

sequelize.authenticate()
   .then(() => console.log('✅ Database connected!'))
   .catch((error) => console.error('❌ Database connection error:', error));

router.listen(port, () => console.log(`server listening on ${port}`));