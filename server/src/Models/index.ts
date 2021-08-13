import { Sequelize } from 'sequelize-typescript'
import { User } from './user.model';
import { Friend } from './friend.model';
import { Region } from './region.model';
import { TopicReplies } from './topicReplies.model';
import { Topic } from './topic.model';
import { Votes } from './vote.model';

const {DATABASE_TEST, DATABASE, NODE_ENV, DB_USERNAME, DB_PW} = process.env;

export const sequelize = new Sequelize({
  database: NODE_ENV === 'test' ? DATABASE_TEST : DATABASE,
  dialect: 'postgres',
  logging: false,
  username: DB_USERNAME,
  password: DB_PW,
})

sequelize.addModels([User]);
sequelize.addModels([Friend]);
sequelize.addModels([Region]);
sequelize.addModels([TopicReplies]);
sequelize.addModels([Topic]);
sequelize.addModels([Votes]);
