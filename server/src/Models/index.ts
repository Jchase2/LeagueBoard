import { Sequelize } from 'sequelize-typescript'
import { User } from './user.model';
import { Friend } from './friend.model';
import { Region } from './region.model';
import { Topic } from './topic.model';
import { Votes } from './vote.model';
import { Matches } from './match.model';

const {DATABASE_TEST, DATABASE, NODE_ENV, DB_USERNAME, DB_PW} = process.env;

export const sequelize = new Sequelize({
  models: [User, Friend, Region, Topic, Votes, Matches],
  database: NODE_ENV === 'test' ? DATABASE_TEST : DATABASE,
  dialect: 'postgres',
  logging: false,
  username: DB_USERNAME,
  password: DB_PW,
})
