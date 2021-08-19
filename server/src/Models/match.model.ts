import { Table, Column, Model, CreatedAt, DataType } from 'sequelize-typescript'

@Table
export class Matches extends Model {

  @Column
  userid!: string;

  @Column(DataType.ARRAY(DataType.JSONB))
  match1!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match2!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match3!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match4!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match5!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match6!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match7!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match8!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match9!: object | null;

  @Column(DataType.ARRAY(DataType.JSONB))
  match10!: object | null;


  @CreatedAt
  @Column
  created_at!: Date;
}