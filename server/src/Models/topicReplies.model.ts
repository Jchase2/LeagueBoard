import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class TopicReplies extends Model {


  @PrimaryKey
  @Column
  topicid!: number;

  @PrimaryKey
  @Column
  id!: number;

  @Column(DataType.TEXT)
  text!: string;
  
  @Column
  userid!: number;

  @CreatedAt
  @Column
  created_at!: Date;
}