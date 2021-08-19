import { Table, Column, Model, CreatedAt, DataType } from 'sequelize-typescript'

@Table
export class Scrimmages extends Model {

  @Column
  userid_posted!: number;

  @Column
  team_name1!: string;

  @Column
  team_name2!: string;

  //10 players
  @Column
  player1!: number;

  @Column
  player2!: number;

  @Column
  player3!: number;

  @Column
  player4!: number;

  @Column
  player5!: number;

  @Column
  player6!: number;

  @Column
  player7!: number;

  @Column
  player8!: number;

  @Column
  player9!: number;

  @Column
  player10!: number;

  @Column
  bo5?: string;

  @Column
  bo3?: number;

  @Column
  bo1?: number;

  @Column(DataType.DATE)
  date!: Date;

  @CreatedAt
  @Column
  created_at!: Date;
}