export interface ITask {
  id: number
  user_id: number
  title: string
  description?: string
  completed: boolean
  updated_at: string
  created_at: string
}

export interface ITotalTask {
  completed: number
  pending: number
}
