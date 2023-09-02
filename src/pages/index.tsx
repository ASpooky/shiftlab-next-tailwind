/* サンプルページ */

import type { NextPage } from 'next'
import Calendar from '../component/calendar'
import StaticsBoard from '../component/StatisticsBoard'

const Home: NextPage = () => {
  return (
    <>
      <div className="max-w-custom mx-auto">
        <h3 className="ml-5 text-white">※サンプルページ表示中</h3>
        <div className="Glass">
          <div className="flex justify-center items-center ">
            <h1 className="text-3xl font-bold pt-3">Calendar</h1>
          </div>
          <div className="flex flex-col">
            <Calendar></Calendar>
          </div>
        </div>

        <StaticsBoard />
      </div>
    </>
  )
}

export default Home
