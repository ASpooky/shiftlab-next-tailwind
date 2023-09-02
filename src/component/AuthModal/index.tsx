import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationAuthSchema } from '../../utils/validationSchema'
import { MdSwapHoriz } from 'react-icons/md'
import { useMutateAuth } from '../../hooks/useMutateAuth'

interface LoginForm {
  mail_address: string
  pass: string
}

export const AuthModal = (props: any) => {
  const { clickLoginModalHandle } = props
  const [orLoginSignUp, setOrLoginSignUp] = useState(true)
  //true:login,false:singup
  const { loginMutation, registerMutation } = useMutateAuth()

  //背景をクリック時にモーダルが閉じるようにする.
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') clickLoginModalHandle(false)
  }

  const handleOrLoginSignUp = () => {
    setOrLoginSignUp(!orLoginSignUp)
  }

  //zodとuseFormを用いたform作成
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(validationAuthSchema),
  })

  const submitAuthHandler = async (data: LoginForm) => {
    if (orLoginSignUp) {
      loginMutation.mutate({
        email: data.mail_address,
        password: data.pass,
      })
    } else {
      await registerMutation
        .mutateAsync({
          email: data.mail_address,
          password: data.pass,
        })
        .then(() =>
          loginMutation.mutate({
            email: data.mail_address,
            password: data.pass,
          })
        )
    }
  }

  return (
    <div
      id="container"
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
      onClick={handleOnClose}
    >
      <div className="bg-white rounded-lg shadow-2xl w-1/4  min-w-modal">
        <div className="flex justify-center items-center bg-zinc-800 mb-5">
          <div className="font-bold grow text-white flex justify-center items-center gap-2 h-12">
            <h1>{orLoginSignUp ? 'Login' : 'SignUp'}</h1>
            <button onClick={handleOrLoginSignUp}>
              <span className="cursor-pointer mx-2 text-3xl text-gray">
                <MdSwapHoriz />
              </span>
            </button>
          </div>
        </div>
        <form
          className="bg-white rounded-lg shadow-2xl"
          onSubmit={handleSubmit(submitAuthHandler)}
        >
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div className="mb-6">
                <input
                  id="email"
                  type="email"
                  {...register('mail_address')}
                  placeholder="email"
                  className="input-form"
                />
                <p className="text-rose-600">
                  {errors.mail_address?.message
                    ? (('※' + errors.mail_address?.message) as React.ReactNode)
                    : ''}
                </p>
              </div>

              <div className="mb-2">
                <input
                  id="password"
                  type="password"
                  {...register('pass')}
                  placeholder="password"
                  className="input-form"
                />
                <p className="text-rose-600">
                  {errors.pass?.message
                    ? (('※' + errors.pass?.message) as React.ReactNode)
                    : ''}
                </p>
              </div>

              <button type="submit" className="font-bold border">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
