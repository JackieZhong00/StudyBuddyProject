import { useCallback} from 'react'
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
  // const [loginData, setLoginData] = useState({})
  

  const toggleModal = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const {
    handleSubmit,
    register,
    // formState: { errors },
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
      console.log(error)
    }
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          {...register('password')}
        />
      </div>
    </form>
  )

  const footer = (
    <div className="">
      <span>First time using Study Buddy?</span>
      <button onClick={toggleModal}>Create Account</button>
    </div>
  )

  return (
    <Modal
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  )
}
export default LoginModal
