/* ログイン後ページ */
import type { NextPage } from 'next'
import Calendar from '../../component/calendar'
import { initSalary } from '../..//Data/Data'
import { useEffect } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { useRouter } from 'next/router'
import StaticBoard from '../../component/StatisticsBoard'

const Home: NextPage = () => {
  const { isLogin } = useLoginContext()
  const router = useRouter()

  useEffect(() => {
    //router
    if (!isLogin) {
      window.alert('ログインしてください')
      router.push('/')
    }
  }, [isLogin])

  const salary: any = []
  initSalary.years.map((year) => {
    salary.push({
      series: year.workspace.map((workspace) => {
        return workspace.series[0].data.reduce(
          (num1: number, num2: number) => num1 + num2
        )
      }),
    })
  })

  return (
    <>
      <div className="max-w-custom mx-auto">
        <h3 className="ml-5 text-white">※ログイン済みです,ようこそ!</h3>
        <div className="Glass">
          <div className="flex justify-center items-center ">
            <h1 className="text-3xl font-bold pt-3">Calendar</h1>
          </div>
          <div className="flex flex-col">
            <Calendar></Calendar>
          </div>
        </div>

        <StaticBoard />
      </div>
    </>
  )
}

export default Home
