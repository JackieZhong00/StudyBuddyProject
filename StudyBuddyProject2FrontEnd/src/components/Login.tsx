import useLoginModal from '../hooks/useLoginModal'
import useRegisterModal from '../hooks/useRegisterModal'
import LoginModal from '../modals/LoginModal'
import RegisterModal from '../modals/RegisterModal'
// import { openModal } from '../hooks/modalSlice'

const Login = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  return (
    <div className="">
      <div className="flex justify-center items-center pt-60 bg-pink-300">
        <h1 className="text-7xl text-white">Study Buddy</h1>
      </div>
      <div className="flex justify-center align-middle bg-pink-300 h-screen">
        <div className="flex flex-col w-1/4 mt-10">
          <button
            className="ml-2 mb-5 text-center text-white border-white border-solid rounded-lg border-2 px-4 py-4"
            onClick={loginModal.onOpen}
          >
            Log in
          </button>
          <button
            className="ml-2 text-center text-white border-white border-solid rounded-lg border-2 px-4 py-4"
            onClick={registerModal.onOpen}
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="flex absolute bg-pink-300 top-[30%] left-[30%]">
        <LoginModal />
        <RegisterModal />
      </div>
    </div>
  )
}
export default Login
