import { useCallback, useState} from 'react'
import useLoginModal from '../hooks/useLoginModal'
import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
// import { toast } from 'react-hot-toast'

type loginInfo = {
  email: string
  password: string
}

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isAuthorized,setIsAuthorized] = useState(true)
  

  const toggleModal = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const {
    handleSubmit,
    register,
  } = useForm<loginInfo>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<loginInfo> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login', 
        data, {withCredentials: true}
      )
      // setLoginData(response.data)
      loginModal.onClose()
      window.location.href = `/profile/${response.data._id}`
    } catch (error) {
      setIsAuthorized(false)
    }
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
      <div className="">
        <label htmlFor="password" className="mr-8">
          Password
        </label>
        <input
          id="password"
          placeholder="password"
          type="password"
          className="border-2 border-gray-500 rounded-md w-[80%] p-1"
          {...register('password')}
        />
      </div>
    </form>
  )

  const footer = (
    <div className="flex flex-col">
      <h3 className='pl-[32%]'>First time using Study Buddy?</h3>
      <button className='text-blue-500' onClick={toggleModal}>Create Account</button>
    </div>
  )

  return (
    <Modal
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isAuthorized={isAuthorized}
      body={body}
      footer={footer}
    />
  )
}
export default LoginModal
