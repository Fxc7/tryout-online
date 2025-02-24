import { DataTypes } from 'sequelize';

import sequelize from '#database/connection.js';

export { sequelize };

export const Configs = sequelize.define('Configs', {
   title: { type: DataTypes.STRING, allowNull: true },
   description: { type: DataTypes.STRING, allowNull: true },
   link: { type: DataTypes.JSON, allowNull: true },
   sosmed: { type: DataTypes.JSON, allowNull: true }
}, { timestamps: false });

export const Reviews = sequelize.define('Reviews', {
   author: { type: DataTypes.STRING, allowNull: true },
   review: { type: DataTypes.STRING, allowNull: true },
   display: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: true }
}, { timestamps: false });

export const Users = sequelize.define('Users', {
   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
   profile: { type: DataTypes.STRING, allowNull: false },
   username: { type: DataTypes.STRING, allowNull: false },
   first_name: { type: DataTypes.STRING, allowNull: false },
   last_name: { type: DataTypes.STRING, allowNull: false },
   bio: { type: DataTypes.STRING, allowNull: false },
   phone: { type: DataTypes.STRING, allowNull: false },
   country: { type: DataTypes.STRING, allowNull: false },
   city: { type: DataTypes.STRING, allowNull: false },
   email: { type: DataTypes.STRING, allowNull: false },
   password: { type: DataTypes.STRING, allowNull: false },
   role: { type: DataTypes.ENUM('superadmin', 'user'), defaultValue: 'user' },
   type: { type: DataTypes.ENUM('SD', 'SMP', 'SMK'), allowNull: false }
}, { timestamps: true });

export const Tryout = sequelize.define('Tryouts', {
   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.TEXT, allowNull: true },
   type: { type: DataTypes.ENUM('SD', 'SMP', 'SMK'), allowNull: false },
   duration: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

export const Question = sequelize.define('Questions', {
   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
   tryoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Tryout, key: 'id' }
   },
   questionText: { type: DataTypes.TEXT, allowNull: false },
   options: { type: DataTypes.JSON, allowNull: false },
   correctAnswer: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export const UserAnswer = sequelize.define('UserAnswers', {
   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: 'id' }
   },
   tryoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Tryout, key: 'id' }
   },
   questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Question, key: 'id' }
   },
   selectedAnswer: { type: DataTypes.STRING, allowNull: false },
   isCorrect: { type: DataTypes.BOOLEAN, allowNull: false }
}, { timestamps: true });

export const Result = sequelize.define('Results', {
   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
   userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Users, key: 'id' }
   },
   tryoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Tryout, key: 'id' }
   },
   score: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

Users.hasMany(Result, { foreignKey: 'userId' });
Result.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(UserAnswer, { foreignKey: 'userId' });
UserAnswer.belongsTo(Users, { foreignKey: 'userId' });

Tryout.hasMany(Question, { foreignKey: 'tryoutId' });
Question.belongsTo(Tryout, { foreignKey: 'tryoutId' });

Tryout.hasMany(Result, { foreignKey: 'tryoutId' });
Result.belongsTo(Tryout, { foreignKey: 'tryoutId' });

Tryout.hasMany(UserAnswer, { foreignKey: 'tryoutId' });
UserAnswer.belongsTo(Tryout, { foreignKey: 'tryoutId' });

Question.hasMany(UserAnswer, { foreignKey: 'questionId' });
UserAnswer.belongsTo(Question, { foreignKey: 'questionId' });

sequelize.sync({ alter: true })
   .then(() => console.log('Database & tables synced!'))
   .catch(error => console.error('Error syncing database:', error));