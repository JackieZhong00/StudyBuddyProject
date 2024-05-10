import { useCallback } from 'react'
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

// interface LoginModalProps {
//   modalState: boolean
// }

const RegisterModal = () => {
  // const {isOpen} = useSelector((store: RootState)=>store.modal)
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
      .catch((e) => console.log(e))
  }

  const body = (
    <form>
      <div className="">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="email"
          type="text"
          {...register('email')}
        />
      </div>
      <div className="">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          type="text"
          {...register('username')}
        />
      </div>
      <div className="">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="password"
          type="text"
          {...register('password')}
        />
      </div>
      {/* <button type="submit">Register</button> */}
    </form>
  )

  const footer = (
    <div className="">
      <span>Already have an account with Study Buddy?</span>
      <button onClick={toggleModal}>Sign in</button>
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
