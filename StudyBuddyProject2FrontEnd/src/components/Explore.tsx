import Navbar from './Navbar'
import { useEffect, useState } from 'react'
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
  const [dbFetch, setDbFetch] = useState(false)
  const [shownUsers, setShownUsers] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentUser, setCurrentUser] = useState<currentUser>({
    pictureUpload: '',
    locations: [''],
    dates: [''],
    promptResponses: [''],
    _id: '',
  })
  const {id} = useParams<UseParams>()
  // //fetches shownUsers array from local storage --> then sets shownUsers state value with it
  // useEffect(() => {
  //   const storedShownUsers = localStorage.getItem('shownUsers')
  //   if (storedShownUsers) {
  //     try {
  //       const parsedUsers = JSON.parse(storedShownUsers)
  //       setShownUsers(parsedUsers)
  //     } catch (error) {
  //       console.error('Error parsing storedShownUsers:', error)
  //     }
  //   }
  // }, [])

  // //fetches from mongodb and filters using shownUsers
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/users', { withCredentials: true })
  //     .then((res) => {
  //       setAllUsers(
  //         res.data.filter((user: currentUser) => !shownUsers.includes(user._id))
  //       )
  //     })
  //     .catch((e) => console.log(e))
  // }, [])

  // // upon click --> adds new id to shownUsers array, sets currentUser to be the next one in allUsers
  // useEffect(() => {
  //   if (allUsers.length > 0) {
  //     setCurrentUser(allUsers[currentIndex])
  //     setShownUsers((prev) => [...prev, currentUser._id]) // insert id of current user into shownUsers
  //   }
  // }, [currentIndex, allUsers])

  // const nextUserIndex = () => {
  //   setCurrentIndex((prev) => {
  //     return prev + 1
  //   })
  // }

  // // stores shownUsers in local storage with every id that is added to the array
  // useEffect(() => {
  //   window.localStorage.setItem('shownUsers', JSON.stringify(shownUsers))
  // }, [shownUsers])

  useEffect(() => {
    axios
      .get('http://localhost:8080/users', { withCredentials: true })
      .then((res) => {
        window.localStorage.setItem('users', JSON.stringify(res.data))
        setDbFetch(true)
      })
      .catch((e) => console.log(e))
  }, [dbFetch])

  useEffect(() => {
    const fetchedUsers = window.localStorage.getItem('users')
    if (fetchedUsers) {
      try {
        const parsedUsers = JSON.parse(fetchedUsers)
        setAllUsers(parsedUsers)
      } catch (error) {
        console.error('Error parsing storedShownUsers:', error)
      }
    }
  }, [])

  const nextUserIndex = () => {
    const newUsersList = allUsers.slice(1)
    window.localStorage.setItem('users', JSON.stringify(newUsersList))
    setCurrentIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if (allUsers.length > 0) {
      setCurrentUser(allUsers[currentIndex])
    }
  }, [currentIndex, allUsers])

  console.log(allUsers)

  return (
    <>
      <button
        onClick={nextUserIndex}
        disabled={currentIndex === allUsers.length - 1}
        className=" border border-black border-solid rounded-xl bg-white text-blue-700 fixed top-96 left-36 p-5"
      >
        Show Next User
      </button>
      <div className="flex items-center justify-center h-screen">
        {/* {allUsers.map((user) => {
          return ( */}
        {currentUser && (
          <div className=" border border-solid border-black w-3/5 h-4/5 rounded bg-slate-600 relative overflow-y-auto">
            <div className="absolute border border-solid border-black w-28 h-28 bg-pink-700 top-10 left-20 rounded-full">
              <img
                src={currentUser.pictureUpload}
                className="border border-solid border-black w-28 h-28 bg-pink-700 top-10 left-20 rounded-full"
              />
            </div>

            {/* <div className="xl:w-7/12 h-36 border border-solid bg-pink-700 rounded-lg absolute top-8 left-64 lg:w-2/4 md:w-2/5 sm:w-1/3"></div> */}
            <div className="flex justify-between h-44 w-8/12 absolute top-8 left-1/4 ">
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
            <div>
              <div
                className="bg-white border 
            border-solid border-black 
            rounded-lg flex flex-col absolute top-52 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="career-prompt">
                  What are your career aspirations?
                </label>
                {/* <input
                type="text"
                id="career-prompt"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
                <hr className="border-t-2 border-black"></hr>

                <input defaultValue={currentUser.promptResponses[0]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-2/4 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="enviro-prompt">
                  What is your ideal study environment?
                </label>
                <hr className="border-t-2 border-black"></hr>

                {/* <input
                id="enviro-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
                <input defaultValue={currentUser.promptResponses[1]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-3/4 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="traits-prompt">
                  What are 3 traits you're looking for in a study buddy?
                </label>
                <hr className="border-t-2 border-black"></hr>

                {/* <input
                id="traits-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
                <input defaultValue={currentUser.promptResponses[2]} readOnly />
              </div>
              <div
                className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-[98%] left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
              >
                <label htmlFor="hobbies-prompt">
                  Outside of studying/working, what do you like to do for fun?
                </label>
                <hr className="border-t-2 border-black"></hr>
                {/* <input
                id="hobbies-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
                {/* <textarea
                  rows={3}
                  cols={45}
                  id="hobbies-prompt"
                  className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
                /> */}
                <input defaultValue={currentUser.promptResponses[3]} readOnly />
              </div>
            </div>
          </div>
        )}

        {/* )
        })} */}
      </div>
      <Navbar />
    </>
  )
}
export default Explore
