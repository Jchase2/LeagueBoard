import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript'

@Table
export class Topic extends Model {

  @PrimaryKey
  @Column
  id!: number;

  @Column
  title!: string;

  @Column(DataType.TEXT)
  text!: string;
  
  @Column
  userid!: number;

  @Column
  parentid!: number;

  @CreatedAt
  @Column
  created_at!: Date;
}