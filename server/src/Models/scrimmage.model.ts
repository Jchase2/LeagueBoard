import {
  Table,
  Column,
  Model,
  CreatedAt,
  DataType,
} from "sequelize-typescript";

@Table
export class Scrimmages extends Model {
  @Column
  userid_posted!: number;

  @Column
  date!: string;

  @Column
  time!: string;

  @Column
  bestOf!: string;

  @Column
  team_name1!: string;

  @Column
  team_name2!: string;

  @Column
  player1!: string;

  @Column
  player2!: string;

  @Column
  player3!: string;

  @Column
  player4!: string;

  @Column
  player5!: string;

  @Column
  player6!: string;

  @Column
  player7!: string;

  @Column
  player8!: string;

  @Column
  player9!: string;

  @Column
  player10!: string;

  @CreatedAt
  @Column
  created_at!: Date;
}
