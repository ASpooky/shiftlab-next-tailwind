import React from 'react'

import { useState, useEffect } from 'react'
import { Salary } from '../../Data/Data'
import { useLoginContext } from '../../context/LoginContext'
import ViewSalary from '../../component/viewSalary'
import CircleGraph from '../../component/circleGraph'
import dayjs from 'dayjs'

type SalaryElement = {
  year: number
  workspace: {
    name: string
    workspaceId: number
    series: [
      {
        name: string
        data: number[]
      }
    ]
  }[]
}

function index() {
  const { shiftsState, workspaceState, isLogin } = useLoginContext()
  //収入記録用
  const [salary, setSalary] = useState({
    years: [
      {
        year: 2022,
        workspace: [
          {
            name: '',
            workspaceId: 0,
            series: [
              {
                name: '',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              },
            ],
          },
        ],
      },
    ],
  })

  const NewWorkspaceDefault = () => {
    const workspaceDefault: {
      name: string
      workspaceId: number
      series: [
        {
          name: string
          data: number[]
        }
      ]
    }[] = []
    workspaceState.map((workspace) => {
      workspaceDefault.push({
        name: workspace.name,
        workspaceId: workspace.id,
        series: [
          {
            name: workspace.name,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      })
    })
    return workspaceDefault
  }

  useEffect(() => {
    console.log('reload staticboard')

    //以下収入計算
    const outPutSalary: SalaryElement[] = []

    console.log(
      'shiftstate is',
      shiftsState,
      shiftsState.filter((shift) => shift.id === 0).length
    )

    if (shiftsState.filter((shift) => shift.id === 0).length === 0) {
      console.log('recalcurate', shiftsState)
      shiftsState.map((shift) => {
        const start = dayjs(shift.end_time)
        const diff = start.diff(dayjs(shift.start_time), 'hour', true)
        const year = dayjs(shift.start_time).format('YYYY')
        const month = dayjs(shift.start_time).format('MM')

        //未登録の年代であれば追加
        if (
          outPutSalary.filter((years) => years.year === Number(year)).length ===
          0
        ) {
          outPutSalary.push({
            year: Number(year),
            workspace: NewWorkspaceDefault(),
          })
        }

        //シフトから日給を計算し月給に加算
        outPutSalary
          .filter((years) => years.year === Number(year))[0]
          .workspace.find(
            ({ workspaceId }) => workspaceId === shift.workspace_id
          )
          ?.series[0].data.splice(
            Number(month) - 1,
            1,
            outPutSalary
              .filter((years) => years.year === Number(year))[0]
              .workspace.find(
                ({ workspaceId }) => workspaceId === shift.workspace_id
              )?.series[0].data[Number(month) - 1]! +
              Math.floor(
                diff *
                  workspaceState.find(({ id }) => (id = shift.workspace_id))
                    ?.salary!
              )
          )
        console.log('processings is', outPutSalary)
      })
      const final = { years: outPutSalary }
      console.log('final is', outPutSalary)
      if (isLogin) {
        setSalary(final)
      } else {
        setSalary(Salary)
      }
    } else {
      setSalary({
        years: [
          {
            year: 2022,
            workspace: [
              {
                name: '',
                workspaceId: 0,
                series: [
                  {
                    name: '',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  },
                ],
              },
            ],
          },
        ],
      })
    }
  }, [shiftsState, workspaceState])

  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <ViewSalary salary={salary} />
      <CircleGraph salary={salary} />
    </div>
  )
}

export default index
