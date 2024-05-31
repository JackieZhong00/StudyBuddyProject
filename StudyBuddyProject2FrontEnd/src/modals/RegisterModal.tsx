import { useCallback, useState } from 'react'
import useLoginModal from '../hooks/useLoginModal'
import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { RootState } from '../types/reduxTypes'

type registerInfo = {
  email: string
  username: string
  password: string
  preventDefault: () => void
}



const RegisterModal = () => {
  const [isAvailable, setIsAvailable] = useState(true)
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const toggleModal = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<registerInfo>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<registerInfo> = (data) => {
    console.log(data)
    axios
      .post('http://localhost:8080/auth/register', data)
      .then(() => {
        toast.success('Account Created!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((e) => setIsAvailable(false))
  }

  const body = (
    <form className="flex flex-col justify-items-center">
      <div className="mb-3">
        <label htmlFor="email" className="mr-16">
          Email
        </label>
        <input
          id="email"
          placeholder="email"
          type="text"
          className="border-2 border-gray-500 rounded-md w-[80%] p-1"
          {...register('email')}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="mr-7">
          Username
        </label>
        <input
          id="username"
          placeholder="username"
          type="text"
          className="border-2 border-gray-500 rounded-md w-[80%] p-1"
          {...register('username')}
        />
      </div>
      <div className="-mb-10">
        <label htmlFor="password" className="mr-8">
          Password
        </label>
        <input
          id="password"
          placeholder="password"
          type="text"
          className="border-2 border-gray-500 rounded-md w-[80%] p-1"
          {...register('password')}
        />
      </div>
      <p className="flex justify-center text-red-500 mt-5">
        {isAvailable
          ? ''
          : 'This email is already associated with an existing account'}
      </p>
    </form>
  )

  const footer = (
    <div className="flex flex-col">
      <span className="pl-[25%]">
        Already have an account with Study Buddy?
      </span>
      <button className='text-blue-500' onClick={toggleModal}>Sign in</button>
    </div>
  )

  return (
    <Modal
      title="Register"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
      isAuthorized={true}
    />
  )
}
export default RegisterModal
