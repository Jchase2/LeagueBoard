export interface IScrimmage {
  date: string,
  time: string,
  teams: {
    team1: ITeam1,
    team2: ITeam2
  }
}

interface ITeam1 {
  teamName: string,
  players: IPlayer[]
}
interface ITeam2 {
  teamName: string,
  players: IPlayer[]
}
interface IPlayer {
  name: string,
  rank: 'string',
  level: number
}
