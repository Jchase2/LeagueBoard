import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class Region extends Model {

  @Column
  code!: string;

  @Column
  name!: string;

  @CreatedAt
  @Column
  created_at!: Date;
}