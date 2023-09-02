import Link from 'next/link'
import { useLoginContext } from '../../context/LoginContext'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { AuthModal } from '../AuthModal'
import { LogoutModal } from '../LogoutModal'
import { useMutateAuth } from '../../hooks/useMutateAuth'

const Header: React.FC = () => {
  const {
    viewLoginModal,
    setViewLoginModal,
    viewLogoutModal,
    setViewLogoutModal,
    isLogin,
  } = useLoginContext()
  const { logoutMutation } = useMutateAuth()
  const clickLoginModalHandle = () => {
    setViewLoginModal(!viewLoginModal)
  }
  const clickLogoutModalHandle = () => {
    setViewLogoutModal(!viewLogoutModal)
  }
  const logoutHandler = async () => {
    await logoutMutation.mutateAsync()
  }

  return (
    <>
      {viewLoginModal && (
        <AuthModal clickLoginModalHandle={clickLoginModalHandle} />
      )}
      {viewLogoutModal && (
        <LogoutModal clickLogoutModalHandle={clickLogoutModalHandle} />
      )}
      <div className="bg-zinc-800 py-5 text-white">
        <div className="max-w-custom mx-auto flex justify-evenly items-center font-bold text-xl sm:text-xl lg:text-2xl">
          {isLogin ? (
            <Link href={'/MyPage'}>
              <div className="flex justify-center items-center ml-5">
                <div className="pr-5 mb-2">
                  <CalendarMonthIcon />
                </div>
                ShiftLa
                <ThumbUpOffAltIcon />
              </div>
            </Link>
          ) : (
            <Link href={'/'}>
              <div className="flex justify-center items-center ml-5">
                <div className="pr-5 mb-2">
                  <CalendarMonthIcon />
                </div>
                ShiftLa
                <ThumbUpOffAltIcon />
              </div>
            </Link>
          )}

          <div className="grow"></div>

          <div className="text-sm sm:text-xl lg:text-2xl font bold flex justify-center items-center mr-10 list-none gap-6">
            {isLogin ? (
              <div className="flex gap-5">
                <Link href="Workspace">Workspace</Link>
                <button onClick={clickLogoutModalHandle}>Logout</button>
              </div>
            ) : (
              <button onClick={clickLoginModalHandle}>SignUp/Login</button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
