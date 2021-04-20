export interface IAction {
  type: string
  payload: any
}

export interface IState {
  data: String[]
}

export interface INavButtonProps {
  redirect: string
  pageTitle: string
}

export interface ITopTen {
  player_id: number
  fullname: string
}

export interface IGolfer {
  firstname: string
  lastname: string
  player_id: number
}

export interface ITeam {
  entry_id: number
  fullname: string
  teamname: string
  golfer1: string
  golfer1score: number
  golfer1bonus: number
  golfer2: string
  golfer2score: number
  golfer2bonus: number
  golfer3: string
  golfer3score: number
  golfer3bonus: number
  golfer4: string
  golfer4score: number
  golfer4bonus: number
  golfer5: string
  golfer5score: number
  golfer5bonus: number
  paid: boolean
  tiebreaker: number
}

export interface ILeaderboard {
  firstname: string
  lastname: string
  player_id: number
  score: number
  currentround: number
  holes_played: number
  player_status: string
}

export interface IStanding {
  teamname: string
  entry_id: number
  rawtotal: number
  total: number
  tiebreaker: string
}

export interface IAutoUpdate {
  setting: string
  status: boolean
}