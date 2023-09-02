import React, { useEffect, useState } from 'react'
import { Salary, salaryOptions } from '../../Data/Data'
import dynamic from 'next/dynamic'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Salary = {
  years: {
    year: number
    workspace: {
      name: string
      workspaceId: number
      series: {
        data: number[]
      }[]
    }[]
  }[]
}

type Props = {
  salary: Salary
}

const ViewSalary: React.VFC<Props> = ({ salary }) => {
  const [viewWorkSpace, setViewWorkSpace] = useState(0)

  const [viewYear, setViewYear] = useState(salary.years.length - 1)
  const prevWorkSpace = () => {
    if (viewWorkSpace === 0) {
      setViewWorkSpace(salary.years[0].workspace.length - 1)
    } else {
      setViewWorkSpace(viewWorkSpace - 1)
    }
  }
  const nextWorkSpace = () => {
    if (viewWorkSpace === salary.years[0].workspace.length - 1) {
      setViewWorkSpace(0)
    } else {
      setViewWorkSpace(viewWorkSpace + 1)
    }
  }
  const prevYear = () => {
    if (viewYear === 0) {
      setViewYear(salary.years.length - 1)
    } else {
      setViewYear(viewYear - 1)
    }
  }
  const nextYear = () => {
    if (viewYear === salary.years.length - 1) {
      setViewYear(0)
    } else {
      setViewYear(viewYear + 1)
    }
  }

  return (
    <div className="Glass flex-1">
      <div className="flex justify-center items-center">
        <button onClick={prevWorkSpace}>
          <span className="cursor-pointer text-gray-600 mx-2 text-3xl flex-1">
            <MdChevronLeft />
          </span>
        </button>
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="DashboardFont mx-2">
            {salary.years[viewYear].workspace[viewWorkSpace].name}
          </h1>
        </div>
        <button onClick={nextWorkSpace}>
          <span className="cursor-pointer text-gray-600 mx-2 text-3xl">
            <MdChevronRight />
          </span>
        </button>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <Chart
            options={salaryOptions.options}
            series={salary.years[viewYear].workspace[viewWorkSpace].series}
            type="bar"
            className="container max-w-eighty"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={prevYear}>
          <span className="cursor-pointer text-gray-600 mx-2 text-3xl flex-1">
            <MdChevronLeft />
          </span>
        </button>
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="DashboardFont mx-2">{salary.years[viewYear].year}</h1>
        </div>
        <button onClick={nextYear}>
          <span className="cursor-pointer text-gray-600 mx-2 text-3xl">
            <MdChevronRight />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ViewSalary
