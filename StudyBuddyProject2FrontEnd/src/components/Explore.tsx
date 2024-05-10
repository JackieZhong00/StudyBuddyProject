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
  }, [])

  // stores shownUsers in local storage with every id that is added to the array
  useEffect(() => {
    window.localStorage.setItem('shownUsers', JSON.stringify(shownUsers))
  }, [shownUsers])

  return (
    <section className="bg-red-300 relative">
      <button
        onClick={nextUserIndex}
        disabled={currentIndex === allUsers.length - 1}
        className=" border border-black border-solid rounded-xl bg-white text-blue-300 p-5 absolute bottom-[150px] left-[45vw]"
      >
        Next
      </button>
      <section className="">
        <p className="pt-10  text-center text-5xl text-white">Study Buddy</p>
      </section>
      <div className="flex items-center justify-center h-screen">
        {/* {allUsers.map((user) => {
          return ( */}
        {currentUser && (
          <section className="flex p-[3rem] overflow-x-scroll class-list">
            <article className="card">
              <img
                src={currentUser.pictureUpload}
                className="border border-solid border-black aspect-square bg-pink-700 top-10 left-20 rounded-full"
              />
            </article>
            <article className="card">
              <label htmlFor="contactInfo" className="card-label">
                What are your career aspirations?
              </label>

              <input
                defaultValue={currentUser.promptResponses[1]}
                readOnly
                className="user-answers"
              />
            </article>
            <article className="card">
              <label htmlFor="enviro-prompt" className="card-label">
                What is your ideal study environment?
              </label>
              <input
                defaultValue={currentUser.promptResponses[2]}
                readOnly
                className="user-answers"
              />
            </article>
            <article className="card">
              <label htmlFor="traits-prompt" className="card-label">
                What are 3 traits you're looking for in a study buddy?
              </label>

              <input
                defaultValue={currentUser.promptResponses[3]}
                readOnly
                className="user-answers"
              />
            </article>
            <article className="card">
              <label htmlFor="hobbies-prompt" className="card-label">
                Outside of studying/working, what do you like to do for fun?
              </label>

              <input
                defaultValue={currentUser.promptResponses[4]}
                readOnly
                className="user-answers"
              />
            </article>
            <article className="card">
              <label htmlFor="contactInfo" className="card-label">
                My instagram handle/email/number is...
              </label>

              <input
                defaultValue={currentUser.promptResponses[0]}
                readOnly
                className="user-answers"
              />
            </article>
            <article className="card">
              <div className="">
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
            </article>
          </section>
        )}
      </div>
      <div className="fixed top-10 flex-col justify-center align-middle ml-10 h-full">
        <Navbar />
      </div>
    </section>
  )
}
export default Explore
