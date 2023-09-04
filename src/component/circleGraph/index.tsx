import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import dynamic from 'next/dynamic'
import { Salary } from '../../Data/Data'
import { useLoginContext } from '../../context/LoginContext'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Salary = {
  years: {
    year: number
    workspace: {
      name: string
      workspaceId: number
      series: {
        name: string
        data: number[]
      }[]
    }[]
  }[]
}

type Props = {
  salary: Salary
}

const CircleGraph: React.VFC<Props> = ({ salary }) => {
  const yearSalary: any = []
  salary.years.map((year: any) => {
    yearSalary.push({
      series: year.workspace.map((workspace: any) => {
        return workspace.series[0].data.reduce(
          (num1: number, num2: number) => num1 + num2
        )
      }),
    })
  })

  const [viewYear, setViewYear] = useState(salary.years.length - 1)
  const { workspaceState } = useLoginContext()
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
  const labels: string[] = []
  workspaceState.map((workspace) => {
    labels.push(workspace.name)
  })
  const options = {
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'total',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            },
          },
        },
      },
    },
    labels: labels,
  }
  return (
    <div className="Glass flex-1">
      <div className="flex flex-col justify-center items-center">
        <div className="container">
          <Chart
            options={options}
            series={yearSalary[viewYear].series}
            type="donut"
            className="container"
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

export default CircleGraph
