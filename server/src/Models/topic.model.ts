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
export class Topic extends Model {
  @Column
  title!: string;

  @Column(DataType.TEXT)
  text!: string;

  @Column
  userid!: number;

  @Column
  parentid!: number;

  @Column
  closed!: boolean;

  @CreatedAt
  @Column
  created_at!: Date;
}
