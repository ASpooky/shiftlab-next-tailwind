import { useEffect, useState } from 'react'
import { useCalendarContext } from '../../context/CalendarContext'
import { getMonth } from '../../utils/handleDate'
import { CalendarHeader } from './calendarHeader'
import { Month } from './month'
import { EventModal } from '../CallendarEventModal'
import { EditedEventModal } from '../EditedEventModal'
import { Week } from './week'

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal, showEditedEventModal } =
    useCalendarContext()

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <>
      {showEventModal && <EventModal />}
      {showEditedEventModal && <EditedEventModal />}
      <div className="flex justify-center items-center border-2 rounded-3xl m-5">
        <div className="flex flex-col container p-2 m-2">
          <CalendarHeader />
          <Week />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  )
}

export default Calendar
