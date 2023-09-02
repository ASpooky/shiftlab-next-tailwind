import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

export const Salary = {
  years: [
    {
      year: 2020,
      workspace: [
        {
          name: 'セブンイレブン',
          workspaceId: 15,
          series: [
            {
              name: 'セブンイレブン',
              data: [
                45000, 35000, 49000, 60000, 70000, 91000, 20000, 70000, 10000,
                60000, 3000, 10000,
              ],
            },
          ],
        },
        {
          name: '鳥貴族',
          workspaceId: 1,
          series: [
            {
              name: '鳥貴族',
              data: [
                35000, 49000, 60000, 10000, 91000, 20000, 70000, 10000, 60000,
                30000, 40000, 45000,
              ],
            },
          ],
        },
        {
          name: '塾',
          workspaceId: 16,
          series: [
            {
              name: '塾',
              data: [
                45000, 35000, 49000, 60000, 70000, 91000, 20000, 70000, 10000,
                60000, 30000, 40000,
              ],
            },
          ],
        },
      ],
    },
    {
      year: 2021,
      workspace: [
        {
          name: 'セブンイレブン',
          workspaceId: 15,
          series: [
            {
              name: 'セブンイレブン',
              data: [
                40000, 15000, 35000, 49000, 60000, 70000, 11000, 20000, 70000,
                10000, 60000, 3000,
              ],
            },
          ],
        },
        {
          name: '鳥貴族',
          workspaceId: 1,
          series: [
            {
              name: '鳥貴族',
              data: [
                19000, 60000, 70000, 91000, 20000, 10000, 10000, 60000, 30000,
                40000, 45000, 35000,
              ],
            },
          ],
        },
        {
          name: '塾',
          workspaceId: 16,
          series: [
            {
              name: '塾',
              data: [
                60000, 30000, 40000, 45000, 35000, 49000, 60000, 70000, 91000,
                20000, 10000, 10000,
              ],
            },
          ],
        },
      ],
    },
    {
      year: 2022,
      workspace: [
        {
          name: 'セブンイレブン',
          workspaceId: 15,
          series: [
            {
              name: 'セブンイレブン',
              data: [
                35000, 49000, 60000, 70000, 91000, 20000, 70000, 10000, 60000,
              ],
            },
          ],
        },
        {
          name: '鳥貴族',
          workspaceId: 1,
          series: [
            {
              name: '鳥貴族',
              data: [
                70000, 91000, 20000, 70000, 10000, 60000, 30000, 40000, 45000,
              ],
            },
          ],
        },
        {
          name: '塾',
          workspaceId: 16,
          series: [
            {
              name: '塾',
              data: [
                70000, 10000, 60000, 30000, 40000, 45000, 35000, 49000, 60000,
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const salaryOptions = {
  options: {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    fill: {
      colors: ['#40e0d0'],
    },
  },
}

export const initSalary = {
  years: [
    {
      year: 2022,
      workspace: [
        {
          name: '',
          workspaceId: 0,
          series: [
            {
              data: [0],
            },
          ],
        },
      ],
    },
  ],
}

export const Workspaces = [
  {
    id: 15,
    name: 'セブンイレブン',
    salary: 800,
    morning_salary: 100,
    night_salary: 200,
    color: 'green',
  },
  {
    id: 1,
    name: '鳥貴族',
    salary: 900,
    morning_salary: 200,
    night_salary: 100,
    color: 'teal',
  },
  {
    id: 16,
    name: '塾',
    salary: 1000,
    morning_salary: 0,
    night_salary: 0,
    color: 'red',
  },
]

export const initWorkspaces = [
  {
    name: 'none',
    salary: 0,
    morning_salary: 0,
    night_salary: 0,
    color: '',
  },
]

export const exampleShift = [
  {
    id: 1,
    workspace_id: 15,
    start_time: dayjs().format('YYYY/MM/DDTHH:mm'),
    end_time: dayjs().format('YYYY/MM/DDTHH:mm'),
    Salary: 4000,
    color: 'blue',
  },
  {
    id: 2,
    workspace_id: 1,
    start_time: dayjs('2023/08/4 09:00:00'),
    end_time: dayjs('2023/08/4 17:00:00'),
    Salary: 3000,
    color: 'yellow',
  },
  {
    id: 3,
    workspace_id: 15,
    start_time: dayjs('2023/08/31 09:00:00'),
    end_time: dayjs('2023/08/31 17:00:00'),
    Salary: 5000,
    color: 'red',
  },
  {
    id: 4,
    workspace_id: 16,
    start_time: dayjs('2023/08/31 09:00:00'),
    end_time: dayjs('2023/08/31 17:00:00'),
    Salary: 5000,
    color: 'red',
  },
]
