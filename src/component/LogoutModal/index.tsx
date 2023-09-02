import { useMutateAuth } from '../../hooks/useMutateAuth'

export const LogoutModal = (props: any) => {
  const { clickLogoutModalHandle } = props
  const { logoutMutation } = useMutateAuth()

  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') clickLogoutModalHandle(false)
  }

  const logoutHandler = async () => {
    window.alert('ご利用ありがとうございました。')
    await logoutMutation.mutateAsync()
  }

  return (
    <div
      id="container"
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
      onClick={handleOnClose}
    >
      <div className="bg-white rounded-lg shadow-2xl w-1/4 min-w-modal">
        <div className="flex justify-center items-center bg-zinc-800 mb-5">
          <div className="font-bold grow text-white flex justify-center items-center gap-2 h-12">
            Confirm
          </div>
        </div>
        <div className="flex  flex-col justify-center items-center mb-8">
          <div className="mb-5">
            <h2 className="text-red-500">本当にログアウトしますか?</h2>
          </div>
          <button
            onClick={logoutHandler}
            className="bg-white hover:bg-gray-100 text-gray-800 border font-semibold border-gray-400 rounded shadow py-2 px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
