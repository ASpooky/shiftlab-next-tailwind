import React from 'react'
import { bgLightColors } from '../../Data/selectableColor'
import { MdDelete } from 'react-icons/md'
import { useMutateWorkspace } from '../../hooks/useMutateWorkspace'

function EditedWorkSpace(props: any) {
  const { Workspace } = props
  const { deleteWorkspaceMutation } = useMutateWorkspace()
  return (
    <div className="w-full">
      <label
        className={`${
          bgLightColors[Workspace.color]
        } border-2 rounded-2xl flex justify-center items-center p-3 hover:cursor-pointer peer-checked:border-gray-900 peer-checked:border-2 peer-checked:shadow-lg peer-checked:font-bold`}
      >
        {Workspace.color}
      </label>
      <div className="flex justify-between items-center">
        時給
        <h2>{Workspace.salary}</h2>
      </div>
      <div className="flex justify-between items-center">
        早朝手当
        <h2>{Workspace.morning_salary}</h2>
      </div>
      <div className="flex justify-between items-center">
        深夜手当
        <h2>{Workspace.night_salary}</h2>
      </div>
      <div className="flex justify-end py-2">
        {Workspace.id === 0 ? (
          ''
        ) : (
          <div className="flex">
            <MdDelete
              className="hover:cursor-pointer text-2xl"
              onClick={() => {
                deleteWorkspaceMutation.mutate(Workspace.id)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EditedWorkSpace
