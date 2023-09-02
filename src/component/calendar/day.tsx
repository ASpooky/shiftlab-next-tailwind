import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { useCalendarContext } from '../../context/CalendarContext'
import { exampleShift } from '../../Data/Data'
import { bgLightColors } from '../../Data/selectableColor'
import { useLoginContext } from '../../context/LoginContext'

dayjs.locale('ja')

export const Day = (props: any) => {
  const { day } = props
  const [dayEvents, setDayEvents] = useState<any[]>([])
  const { isLogin, shiftsState, workspaceState } = useLoginContext()

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-sky-600 text-white rounded-full w-7'
      : ''
  }
  const {
    setDaySelected,
    setShowEventModal,
    setEventSelected,
    setShowEditedEventModal,
  } = useCalendarContext()

  useEffect(() => {
    if (isLogin) {
      const events = shiftsState.filter(
        (shifts) =>
          dayjs(shifts.start_time).format('DD-MM-YY') === day.format('DD-MM-YY')
      )
      setDayEvents(events)
    } else {
      const events = exampleShift.filter(
        (shifts) =>
          dayjs(shifts.start_time).format('DD-MM-YY') === day.format('DD-MM-YY')
      )
      setDayEvents(events)
    }
  }, [day, shiftsState])

  const dayModalOpenHandle = (e: any) => {
    if (e.target.id === 'container') {
      setDaySelected(day)
      setShowEventModal(true)
    }
  }

  return (
    <>
      <div className="border border-gray-200 flex flex-col">
        <header className="flex flex-col items-center">
          <p className={`text-sm p-1 text-center ${getCurrentDayClass()}`}>
            {day.format('DD')}
          </p>
        </header>
        <div
          id="container"
          className="grid grid-cols-3 mr-2 grid-rows-2 sm:grid-cols-4 xl:grid-cols-7 flex-grow cursor-pointer py-6"
          onClick={dayModalOpenHandle}
        >
          {dayEvents.map((evt, idx) => (
            <div
              key={idx}
              className={`${
                bgLightColors[
                  `${
                    workspaceState.filter(
                      (Workspace) => Workspace.id === evt.workspace_id
                    )[0]
                      ? workspaceState.filter(
                          (Workspace) => Workspace.id === evt.workspace_id
                        )[0].color
                      : ''
                  }`
                ]
              } border-2 rounded-2xl flex justify-center items-center p-2 sm:p-3 hover:border-gray-700`}
              onClick={() => {
                setEventSelected(evt.id)
                setShowEditedEventModal(true)
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}
