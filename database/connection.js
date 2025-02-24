import { Sequelize } from 'sequelize';

export default new Sequelize('tryout-online', 'superadmin', 'sRqkkDg!AR@)CRSN', {
   host: 'localhost',
   dialect: 'mysql',
   logging: false,
   port: 3306
});