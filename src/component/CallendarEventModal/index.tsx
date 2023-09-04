import { useState } from 'react'
import { useCalendarContext } from '../../context/CalendarContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import { validationShiftSchema } from '../../utils/validationSchema'
import { useLoginContext } from '../../context/LoginContext'
import { useMutateShift } from '../../hooks/useMutateShift'

dayjs.locale('ja')

interface ShiftForm {
  workspace_id: string
  start_time: string
  end_time: string
}

export const EventModal = () => {
  const { daySelected, setShowEventModal } = useCalendarContext()
  const { workspaceState, shiftsState, isLogin, setViewLoginModal } =
    useLoginContext()
  const [timeErrMsg, setTimeErrMsg] = useState('')
  const { createShiftMutation } = useMutateShift()

  //zodとuseFormを用いたフォームの作成
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShiftForm>({
    mode: 'onChange',
    resolver: zodResolver(validationShiftSchema),
  })

  const submitAuthHandler = async (data: ShiftForm) => {
    const diff = dayjs(data.end_time).diff(data.start_time)
    if (diff <= 0) {
      setTimeErrMsg('入力値が正しくありません')
    } else {
      createShiftMutation.mutate({
        workspace_id: Number(data.workspace_id),
        start_time: data.start_time,
        end_time: data.end_time,
      })
      setShowEventModal(false)
    }
  }

  const toLoginHandler = () => {
    setShowEventModal(false)
    setViewLoginModal(true)
  }

  return (
    <div
      id="container"
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
    >
      <form
        className="bg-white rounded-lg shadow-2xl w-fit"
        onSubmit={handleSubmit(submitAuthHandler)}
      >
        <div className="p-3">
          <div className="">
            <div className="flex flex-col justify-between items-center">
              <div className="flex w-full justify-end items-end">
                <div
                  onClick={() => {
                    setShowEventModal(false)
                  }}
                  className="cursor-pointer"
                >
                  X
                </div>
              </div>
              <div>
                <span className="text-fuchsia-400 font-bold">N</span>ew Shift
              </div>
              <div>{daySelected.format('MMMM DD日dddd')}</div>
              <div className="flex flex-col justify-center items-start">
                <div className="my-6">
                  <div className="">
                    <div className="">バイト先</div>
                    <div>
                      <select
                        {...register('workspace_id')}
                        className="input-form cursor-pointer"
                      >
                        {workspaceState.map((workspace) => (
                          <option
                            value={workspace.id !== 0 ? workspace.id : ''}
                            key={workspace.name + workspace.created_at}
                          >
                            {workspace.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-rose-600">
                    {errors.workspace_id?.message
                      ? (('※' +
                          errors.workspace_id?.message) as React.ReactNode)
                      : ''}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="">開始時間</div>
                  <input
                    type="datetime-local"
                    className="input-form cursor-pointer"
                    {...register('start_time')}
                    defaultValue={daySelected.format('YYYY-MM-DDTHH:mm')}
                  />
                  <p className="text-rose-600">
                    {errors.start_time?.message
                      ? (('※' + errors.start_time?.message) as React.ReactNode)
                      : ''}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="">終了時間</div>
                  <input
                    type="datetime-local"
                    className="input-form cursor-pointer"
                    {...register('end_time')}
                    defaultValue={daySelected.format('YYYY-MM-DDTHH:mm')}
                  />
                  <p className="text-rose-600">
                    {errors.end_time?.message
                      ? (('※' + errors.end_time?.message) as React.ReactNode)
                      : ''}
                  </p>
                  <p className="text-rose-600">
                    {timeErrMsg ? (('※' + timeErrMsg) as React.ReactNode) : ''}
                  </p>
                </div>
              </div>
              {isLogin ? (
                <button
                  type="submit"
                  className="font-bold rounded-lg px-2 border hover:bg-gray-200"
                >
                  submit
                </button>
              ) : (
                <div
                  className="font-semibold rounded-lg px-2 border hover:bg-gray-200 cursor-pointer"
                  onClick={toLoginHandler}
                >
                  ログインが必要です
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
