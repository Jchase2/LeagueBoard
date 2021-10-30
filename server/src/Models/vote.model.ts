import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table
export class Votes extends Model {
  @PrimaryKey
  @Column
  userid!: number;

  @PrimaryKey
  @Column
  topicid!: number;

  @Column
  value!: number; //0 is not voted up, 1 is voted up

  @CreatedAt
  @Column
  created_at!: Date;
}
