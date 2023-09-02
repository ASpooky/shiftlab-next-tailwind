import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationWorkspaceSchema } from '../../utils/validationSchema'
import { useMutateWorkspace } from '../../hooks/useMutateWorkspace'
import { useEffect } from 'react'
import { SelectableColors, bgLightColors } from '../../Data/selectableColor'
import { useLoginContext } from '../../context/LoginContext'
import { useRouter } from 'next/router'
import EditedWorkSpace from '../../component/EditedWorkspace'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface WorkspaceForm {
  name: string
  color: string
  salary: number
  morning_salary: number
  night_salary: number
}

function index() {
  const { isLogin, workspaceState, viewWorkspace, setViewWorkspace } =
    useLoginContext()
  const router = useRouter()

  useEffect(() => {
    //router
    if (!isLogin) {
      window.alert('ログインしてください')
      router.push('/')
    }
  }, [])

  const { createWorkspaceMutation } = useMutateWorkspace()

  const prevYear = () => {
    if (viewWorkspace === 0) {
      setViewWorkspace(workspaceState.length - 1)
    } else {
      setViewWorkspace(viewWorkspace - 1)
    }
  }
  const nextYear = () => {
    if (viewWorkspace === workspaceState.length - 1) {
      setViewWorkspace(0)
    } else {
      setViewWorkspace(viewWorkspace + 1)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkspaceForm>({
    mode: 'onChange',
    resolver: zodResolver(validationWorkspaceSchema),
  })

  const submitWorkspaceHandler = async (data: WorkspaceForm) => {
    console.log(data)
    createWorkspaceMutation.mutate(data)
    reset()
  }

  return (
    <>
      <div className="max-w-custom mx-auto flex flex-col justify-center items-strech sm:flex-row">
        <div className="Glass flex-1">
          <div className="flex justify-center items-center font-bold">
            Make Workspace
          </div>
          <div className="flex flex-col justify-center items-center">
            <form className="" onSubmit={handleSubmit(submitWorkspaceHandler)}>
              <div className="p-3">
                <div className="grid grid-cols-1/5 items-end gap-y-7">
                  <div id="workspaceName" className="mt-2">
                    <input
                      id="workspace"
                      type="name"
                      {...register('name')}
                      placeholder="workspace name"
                      className="input-form"
                    />
                    <p className="text-rose-600">
                      {errors.name?.message
                        ? (('※' + errors.name?.message) as React.ReactNode)
                        : ''}
                    </p>
                  </div>
                  <div
                    id="Salarys"
                    className="flex flex-col justify-center items-center gap-5"
                  >
                    <div id="hoursSalary">
                      <div className="flex justify-center items-center gap-2">
                        <h3 className="DashboardFont w-12">時給</h3>
                        <input
                          id="hourssalary"
                          type="number"
                          min="1"
                          {...register('salary')}
                          placeholder="800 円"
                          className="input-form"
                        />
                      </div>
                      <div>
                        <p className="text-rose-600">
                          {errors.salary?.message
                            ? (('※' +
                                errors.salary?.message) as React.ReactNode)
                            : ''}
                        </p>
                      </div>
                    </div>
                    <div id="morningSalary">
                      <div className="flex justify-center items-center gap-2">
                        <h3 className="DashboardFont w-12">早朝手当</h3>
                        <input
                          id="morningsalary"
                          type="number"
                          min="0"
                          {...register('morning_salary')}
                          placeholder="+ 100 円"
                          className="input-form"
                        />
                      </div>
                      <p className="text-rose-600">
                        {errors.morning_salary?.message
                          ? (('※' +
                              errors.morning_salary
                                ?.message) as React.ReactNode)
                          : ''}
                      </p>
                    </div>
                    <div id="nightSalary">
                      <div className="flex justify-center items-center gap-2">
                        <h3 className="DashboardFont w-12">深夜手当</h3>
                        <input
                          id="nightsalary"
                          type="number"
                          min="0"
                          {...register('night_salary')}
                          placeholder="+ 100 円"
                          className="input-form"
                        />
                      </div>
                      <p className="text-rose-600">
                        {errors.night_salary?.message
                          ? (('※' +
                              errors.night_salary?.message) as React.ReactNode)
                          : ''}
                      </p>
                    </div>
                  </div>
                  <div id="colors">
                    <div className="grid grid-cols-4 gap-2">
                      {SelectableColors.map((color) => {
                        return (
                          <div key={color}>
                            <input
                              type="radio"
                              className="hidden peer"
                              id={color}
                              value={color}
                              {...register('color')}
                            />
                            <label
                              htmlFor={color}
                              className={`${bgLightColors[color]} border-2 rounded-2xl flex justify-center items-center p-3 hover:cursor-pointer hover:bg-slate-200 peer-checked:border-gray-900 peer-checked:border-2 peer-checked:shadow-lg peer-checked:font-bold`}
                            >
                              {color}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-rose-600">
                      {errors.color?.message
                        ? (('※' + errors.color?.message) as React.ReactNode)
                        : ''}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="font-bold border-2 shadow-lg hover:shadow-none rounded-2xl transition duration-150 ease-in-out"
                  >
                    submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="Glass min-w-half h-2/5">
            <div className="flex justify-center items-start">
              <h2 className="font-bold">All Workspace</h2>
            </div>
            <div className="flex flex-col justify-start items-center gap-10 ">
              <div className="flex flex-col justify-center items-center font-bold w-3/4">
                <div className="flex flex-col justify-center items-center gap-3 container py-4">
                  {workspaceState.map((workspace) => {
                    return (
                      <div
                        key={workspace.id + workspace.name}
                        className="flex justify-center items-center"
                      >
                        {workspace.name}
                        <div
                          className={`${
                            bgLightColors[workspace.color]
                          } border-2 rounded-2xl flex justify-center items-center p-3`}
                        ></div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="Glass min-w-half h-3/6">
            <div className="flex justify-center items-start">
              <h2 className="font-bold">Edited Workspace</h2>
            </div>
            <div className="flex flex-col justify-start items-center gap-10">
              <div className="flex flex-col justify-center items-center font-bold w-3/4">
                <div className="flex justify-center items-center container py-4">
                  <button onClick={prevYear}>
                    <span className="cursor-pointer text-gray-600 text-3xl">
                      <MdChevronLeft />
                    </span>
                  </button>
                  <div className="w-3/4 flex justify-center items-center">
                    <h3 className="DashboardFont">
                      {workspaceState[viewWorkspace].name}
                    </h3>
                  </div>
                  <button onClick={nextYear}>
                    <span className="cursor-pointer text-gray-600 text-3xl">
                      <MdChevronRight />
                    </span>
                  </button>
                </div>
                <EditedWorkSpace Workspace={workspaceState[viewWorkspace]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
