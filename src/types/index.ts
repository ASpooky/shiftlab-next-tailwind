export type CsrfToken = {
  csrf_token: string
}

export type Credential = {
  email: string
  password: string
}

export type Workspace = {
  id: number
  name: string
  salary: number
  morning_salary: number
  night_salary: number
  color: string
  created_at: string
  update_at: string
}

export type Shift = {
  id: number
  workspace_id: number
  start_time: string
  end_time: string
  created_at: string
  update_at: string
}
