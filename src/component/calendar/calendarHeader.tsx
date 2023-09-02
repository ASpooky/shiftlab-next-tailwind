import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useCalendarContext } from '../../context/CalendarContext'

dayjs.locale(ja)

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useCalendarContext()

  //表示年月切り替え関数
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1)
  }
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1)
  }

  const handleReset = () => {
    setMonthIndex(dayjs().month())
  }
  return (
    <header className="px-4 py-2 flex items-center container">
      <button
        className="border rounded py-2 px-4 mr-5 font-bold"
        onClick={handleReset}
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-sm sm:text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  )
}
