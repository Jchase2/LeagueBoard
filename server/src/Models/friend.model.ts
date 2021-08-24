import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, PrimaryKey, Default } from 'sequelize-typescript'

@Table
export class Friend extends Model {

  @PrimaryKey
  @Column
  userid!: number;

  @PrimaryKey
  @Column
  userfriend!: number;

  @Column(DataType.ARRAY(DataType.INTEGER))
  seenposts!: []

  @Default(false)
  @Column
  seen!: boolean;

  @CreatedAt
  @Column
  created_at!: Date;
}