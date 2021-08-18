export interface IScrimmage {
  date: Date,
  time: TimeRanges,
  teams: ITeams[],
}
interface ITeams {
  team1: ITeam1,
  team2: ITeam2
}
interface ITeam1 {
  name: string,
  players: IPlayer[]
}
interface ITeam2 {
  name: string,
  players: IPlayer[]
}
interface IPlayer {
  name: string,
  id: string
}