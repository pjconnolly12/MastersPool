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
  golfer2: string
  golfer3: string
  golfer4: string
  golfer5: string
  paid: boolean
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
}

export interface IAutoUpdate {
  setting: string
  status: boolean
}