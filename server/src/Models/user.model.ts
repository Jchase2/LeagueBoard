import {
  Table,
  Column,
  Model,
  CreatedAt,
  HasMany,
  DataType,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  summoner_name!: string;

  @Column
  regionid!: number;

  @Column
  puuid?: string;

  @Column
  iconid?: number;

  @CreatedAt
  @Column
  created_at!: Date;
}
