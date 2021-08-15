import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class Friend extends Model {

  @PrimaryKey
  @Column
  userid!: number;

  @PrimaryKey
  @Column
  userfriend!: number;

  @CreatedAt
  @Column
  created_at!: Date;
}