import dayjs from 'dayjs'
import { z } from 'zod'

export const validationWorkspaceSchema = z.object({
  name: z
    .string()
    .nonempty('店名は必須です.')
    .max(20, '20文字以上は入力できません.'),
  color: z
    .string({ invalid_type_error: '色を選択してください.' })
    .nonempty('何も選択されていないです'),
  salary: z.preprocess(
    (v) => Number(v),
    z.number().positive('正確な時給を入力してください.')
  ),
  morning_salary: z.preprocess(
    (v) => Number(v),
    z.number().min(0, '0以上にしてください.')
  ),
  night_salary: z.preprocess(
    (v) => Number(v),
    z.number().min(0, '0以上にしてください.')
  ),
})

export const validationShiftSchema = z.object({
  workspace_id: z.string().nonempty('職場を登録してください'),
  start_time: z.string().transform((str) => dayjs(str)),
  end_time: z.string().transform((str) => dayjs(str)),
})

export const validationAuthSchema = z.object({
  mail_address: z
    .string()
    .nonempty('メールアドレスは必須です.')
    .email('正しいメールアドレスを入力してください'),
  pass: z
    .string()
    .nonempty('パスワードは必須です.')
    .min(6, 'パスワードは6文字以上で入力してください'),
})
