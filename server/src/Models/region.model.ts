import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class Region extends Model {

  @PrimaryKey
  @Column
  id!: number;

  @Column
  code!: string;

  @Column
  name!: string;

  @Column
  region!: string;

  @CreatedAt
  @Column
  created_at!: Date;
  
}