import Navbar from './Navbar'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import LocationDateCard from './LocationDateCard'
import { useParams } from 'react-router-dom'

import { ProfileCard } from './ProfileCard'

interface currentUser {
  username: string
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
    username: '',
    pictureUpload: '',
    locations: [''],
    dates: [''],
    promptResponses: [''],
    _id: '',
  })
  const { id } = useParams()
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
      console.log(currentUser)
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
    <section className="bg-pink-300 relative">
      <button
        onClick={nextUserIndex}
        disabled={currentIndex === allUsers.length - 1}
        className=" border border-black border-solid rounded-xl bg-white text-black-300 p-5 absolute bottom-[150px] left-[45vw]"
      >
        Next
      </button>
      <section className="">
        <p className="pt-10  text-center text-5xl text-white">Study Buddy</p>
      </section>
      {currentUser && (
        <div className='mb-10'>
          <article className="h-48 w-48 absolute left-52 mt-10">
            <h2 className='flex justify-center border border-teal-400 border-2 rounded-xl mb-3'>{currentUser.username}</h2>
            <img
              src={currentUser.pictureUpload}
              className="border border-solid border-black aspect-square bg-pink-700 top-10 left-20 rounded-full"
            />
          </article>
          <div className="absolute mt-24 flex right-96 h-20 space-x-12">
            <p className="text-lg w-16 mt-10">Add to calendar</p>
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
        </div>
      )}
      <div className="flex items-center justify-center h-screen">
        {/* {allUsers.map((user) => {
          return ( */}
        {currentUser && (
          <section className="flex p-[3rem] overflow-x-scroll class-list">
            <ProfileCard
              userResponse={currentUser.promptResponses[1]}
              label="What are your career aspirations"
            />
            <ProfileCard
              userResponse={currentUser.promptResponses[2]}
              label="What is your ideal study environment"
            />
            <ProfileCard
              userResponse={currentUser.promptResponses[3]}
              label="What are 3 traits you're looking for in a study buddy?"
            />
            <ProfileCard
              userResponse={currentUser.promptResponses[4]}
              label="Outside of studying/working, what do you like to do for fun?"
            />
            <ProfileCard
              userResponse={currentUser.promptResponses[0]}
              label="My instagram handle/email/number is..."
            />
            
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
