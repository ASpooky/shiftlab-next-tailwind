import React, { createContext, useContext, useState, Dispatch } from 'react'
import dayjs, { Dayjs } from 'dayjs'

const CalendarContext = createContext(
  {} as {
    monthIndex: number
    setMonthIndex: Dispatch<React.SetStateAction<number>>
    daySelected: Dayjs
    setDaySelected: Dispatch<React.SetStateAction<Dayjs>>
    eventSelected: number
    setEventSelected: Dispatch<React.SetStateAction<number>>
    showEditedEventModal: boolean
    setShowEditedEventModal: Dispatch<React.SetStateAction<boolean>>
    showEventModal: boolean
    setShowEventModal: Dispatch<React.SetStateAction<boolean>>
    viewLoginModal: boolean
    setViewLoginModal: Dispatch<React.SetStateAction<boolean>>
  }
)

const CalendarProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [daySelected, setDaySelected] = useState(dayjs())
  const [eventSelected, setEventSelected] = useState(0)
  const [showEditedEventModal, setShowEditedEventModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [viewLoginModal, setViewLoginModal] = useState(false)
  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        eventSelected,
        setEventSelected,
        showEditedEventModal,
        setShowEditedEventModal,
        showEventModal,
        setShowEventModal,
        viewLoginModal,
        setViewLoginModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

const useCalendarContext = () => useContext(CalendarContext)
export { CalendarProvider, useCalendarContext }
