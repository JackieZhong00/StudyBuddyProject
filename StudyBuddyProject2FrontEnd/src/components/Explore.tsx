import Navbar from './Navbar'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import LocationDateCard from './LocationDateCard'
import { useParams } from 'react-router-dom'
import { UseParams } from '../types'

interface currentUser {
  pictureUpload: string
  locations: string[]
  dates: string[]
  promptResponses: string[]
  _id: string
}

const Explore = () => {
  const [allUsers, setAllUsers] = useState([])
  const [shownUsers, setShownUsers] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentUser, setCurrentUser] = useState<currentUser>({
    pictureUpload: '',
    locations: [''],
    dates: [''],
    promptResponses: [''],
    _id: '',
  })
  const { id } = useParams<UseParams>()
  //fetches shownUsers array from local storage --> then sets shownUsers state value with it
  useEffect(() => {
    const storedShownUsers = localStorage.getItem('shownUsers')
    if (storedShownUsers) {
      try {
        const parsedUsers = JSON.parse(storedShownUsers)
        setShownUsers(parsedUsers)
      } catch (error) {
        console.error('Error parsing storedShownUsers:', error)
      }
    }
  }, [])

  //fetches from mongodb and filters using shownUsers
  useEffect(() => {
    axios
      .get('http://localhost:8080/users', { withCredentials: true })
      .then((res) => {
        setAllUsers(
          res.data.filter((user: currentUser) => !shownUsers.includes(user._id))
        )
      })
      .catch((e) => console.log(e))
  }, [])

  // upon click --> adds new id to shownUsers array, sets currentUser to be the next one in allUsers
  useEffect(() => {
    if (allUsers.length > 0) {
      setCurrentUser(allUsers[currentIndex])
      setShownUsers((prev) => [...prev, currentUser._id]) // insert id of current user into shownUsers
    }
  }, [currentIndex, allUsers])

  const nextUserIndex = useCallback(() => {
    setCurrentIndex((prev) => {
      return prev + 1
    })
  },[])

  // stores shownUsers in local storage with every id that is added to the array
  useEffect(() => {
    window.localStorage.setItem('shownUsers', JSON.stringify(shownUsers))
  }, [shownUsers])



  return (
    <section className="bg-black h-full -mt-5">
      <button
        onClick={nextUserIndex}
        disabled={currentIndex === allUsers.length - 1}
        className=" border border-black border-solid rounded-xl bg-white text-blue-700 fixed top-[50%] right-[5%] p-5"
      >
        Next
      </button>
      <section className="flex justify-center pt-20 -mb-16">
        <h1 className="text-7xl text-white">Study Buddy</h1>
      </section>
      <div className="flex items-center justify-center h-screen">
        {/* {allUsers.map((user) => {
          return ( */}
        {currentUser && (
          <div className="border border-solid border-white w-[70%] h-[70%] rounded bg-white-700 relative overflow-y-auto">
            <div className="absolute border border-solid border-white w-40 h-40 bg-pink-700 top-10 left-20 rounded-full overflow-hidden">
              <img
                src={currentUser.pictureUpload}
                className="border border-solid border-black aspect-square bg-pink-700 top-10 left-20 rounded-full"
              />
            </div>

            {/* <div className="xl:w-7/12 h-36 border border-solid bg-pink-700 rounded-lg absolute top-8 left-64 lg:w-2/4 md:w-2/5 sm:w-1/3"></div> */}
            <div className="flex justify-between h-44 w-[60%] absolute top-8 left-1/4 ">
              {
                <LocationDateCard
                  date={currentUser.dates[0]?.toString()?.split('T')[0]}
                  location={currentUser.locations[0]}
                  id={id}
                />
              }
              {
                <LocationDateCard
                  date={currentUser.dates[1]?.toString()?.split('T')[0]}
                  location={currentUser.locations[1]}
                  id={id}
                />
              }
              {
                <LocationDateCard
                  date={currentUser.dates[2]?.toString()?.split('T')[0]}
                  location={currentUser.locations[2]}
                  id={id}
                />
              }
              {
                <LocationDateCard
                  date={currentUser.dates[3]?.toString()?.split('T')[0]}
                  location={currentUser.locations[3]}
                  id={id}
                />
              }
            </div>
            <div className="flex flex-col space-y-4 absolute top-52 left-20 w-full mt-10">
              <div
                className="bg-white border 
            border-solid border-black 
            rounded-lg lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28 "
              >
                <label htmlFor="contactInfo">
                  My instagram handle/email/number is...
                </label>
                <hr className="border-t-2 border-black"></hr>
                <input defaultValue={currentUser.promptResponses[0]} readOnly />
              </div>
              <div
                className="bg-white border 
            border-solid border-black 
            rounded-lg lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="contactInfo">
                  What are your career aspirations?
                </label>
                <hr className="border-t-2 border-black"></hr>

                <input defaultValue={currentUser.promptResponses[1]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="enviro-prompt">
                  What is your ideal study environment?
                </label>
                <hr className="border-t-2 border-black"></hr>
                <input defaultValue={currentUser.promptResponses[2]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="traits-prompt">
                  What are 3 traits you're looking for in a study buddy?
                </label>
                <hr className="border-t-2 border-black"></hr>

                <input defaultValue={currentUser.promptResponses[3]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="hobbies-prompt">
                  Outside of studying/working, what do you like to do for fun?
                </label>
                <hr className="border-t-2 border-black"></hr>

                <input defaultValue={currentUser.promptResponses[4]} readOnly />
              </div>
            </div>
          </div>
        )}

        
      </div>
      <div className="fixed top-10 flex-col justify-center align-middle ml-10 h-full">
        <Navbar />
      </div>
    </section>
  )
}
export default Explore
