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
      <div className="flex h-1/2 justify-center items-center pt-60">
        <h1 className="text-7xl">Study Buddy</h1>
      </div>
      <div className="flex h-screen justify-center align-middle">
        <div className="flex flex-col w-1/4 mt-10">
          <button
            className="ml-2 mb-5 text-center text-black border-white border-solid rounded-lg border-2 px-4 py-4"
            onClick={loginModal.onOpen}
          >
            Log in
          </button>
          <button
            className="ml-2 text-center text-black border-white border-solid rounded-lg border-2 px-4 py-4"
            onClick={registerModal.onOpen}
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="fixed bg-slate-700 h-full top-0 left-0 opacity-80">
        <LoginModal />
        <RegisterModal />
      </div>
    </div>
  )
}
export default Login
