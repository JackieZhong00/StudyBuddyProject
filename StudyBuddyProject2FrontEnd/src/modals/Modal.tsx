import { useState, useCallback, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

type ModalProps = {
  title: string
  body: React.ReactElement
  footer: React.ReactElement
  isOpen?: boolean
  onClose: () => void,
  onSubmit: () => void
  isAuthorized: boolean
}

const Modal = ({
  title,
  body,
  isOpen,
  onClose,
  footer,
  onSubmit,
  isAuthorized
} : ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen)
  
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  const handleSubmit = useCallback(() => {
    onSubmit()
  }, [onSubmit])

  console.log(isOpen)

  if(!isOpen){
    console.log('isOpen not found')
    return null
  }
  return (
    <>
      <div
        className={`
            absolute
            w-[650px]
            translate
            duration-300
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            
          `}
      >
        <div
          className="
              translate
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              bg-white 
              outline-none 
              focus:outline-none
            "
        >
          {/*header*/}
          <div
            className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
          >
            <button
              className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </button>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          {/*body*/}

          <div className="relative p-6 flex-auto">{body}</div>
          {!isAuthorized ? <p className='flex justify-center text-red-500'>Login Credentials are invalid</p> : <div></div>}
          {/*footer*/}
          <div className="flex flex-col gap-2 p-6 content-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-400 border-2 rounded-lg p-3 w-[30%] ml-[35%]"
            >
              Submit
            </button>
            {footer}
          </div>
        </div>
      </div>
    </>
  )
}
export default Modal
