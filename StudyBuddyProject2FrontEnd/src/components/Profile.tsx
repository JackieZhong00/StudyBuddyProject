import { useForm, SubmitHandler, useController } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

// import getUserProfile from '../actions/getUserProfile'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import profile from '../images/profile.jpg'

import axios from 'axios'
import Navbar from './Navbar'
import { useCallback, useEffect, useMemo, useState } from 'react'

type ProfileFormData = {
  date1: Date
  date2: Date
  date3: Date
  date4: Date
  location1: string
  location2: string
  location3: string
  location4: string
  contactInfo: string
  careerPrompt: string
  enviroPrompt: string
  traitsPrompt: string
  hobbiesPrompt: string
  // pictureUpload: string
}

interface UserData {
  email: string
  username: string
  dates: Date[]
  locations: string[]
  contactInfo: string
  promptResponses: string[]
  pictureUpload: string
  _id: string
}

interface UseParams {
  id: string
}

function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const Profile = () => {
  // console.log(currentUser)
  const [image, setImage] = useState({ myFile: '' })
  const [fetchedUserInfo, setFetchedUserInfo] = useState<UserData | {}>({})

  const { id } = useParams<UseParams>()

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setFetchedUserInfo(res.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  const userInfo = useMemo(() => fetchedUserInfo, [fetchedUserInfo])
  //this is called upon file upload (onchange func of input element) --> sets image stateValue --> this state value is used in onSubmit func later on
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    if (typeof base64 === 'string') {
      setImage({ myFile: base64 })
    }
  }

  const schema: ZodType<ProfileFormData> = z.object({
    date1: z.date(),
    date2: z.date(),
    date3: z.date(),
    date4: z.date(),
    location1: z.string().max(150),
    location2: z.string().max(150),
    location3: z.string().max(150),
    location4: z.string().max(150),
    contactInfo: z.string().max(250),
    careerPrompt: z.string().max(250),
    enviroPrompt: z.string().max(250),
    traitsPrompt: z.string().max(250),
    hobbiesPrompt: z.string().max(250),
  })

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const response = await fetch(`http://localhost:8080/users/${id}`, {method: "GET", "credentials": "include"})
      const data = await response.json()
      console.log(data)
      return {
        date1: Date.parse(data.dates[0]),
        date2: Date.parse(data.dates[1]),
        date3: Date.parse(data.dates[2]),
        date4: Date.parse(data.dates[3]),
        location1: data.locations[0],
        location2: data.locations[1],
        location3: data.locations[2],
        location4: data.locations[3],
        contactInfo: data.promptResponses[0],
        careerPrompt: data.promptResponses[1],
        enviroPrompt: data.promptResponses[2],
        traitsPrompt: data.promptResponses[3],
        hobbiesPrompt: data.promptResponses[4],
      }
    },
  })

  // const pictureUpload = register('pictureUpload')

  const { field: date1 } = useController({ name: 'date1', control })
  const { field: date2 } = useController({ name: 'date2', control })
  const { field: date3 } = useController({ name: 'date3', control })
  const { field: date4 } = useController({ name: 'date4', control })

  const handleDateChange = useCallback((name: string, option: Date | null) => {
    if (name === 'date1') {
      date1.onChange(option)
    } else if (name === 'date2') {
      date2.onChange(option)
    } else if (name === 'date3') {
      date3.onChange(option)
    } else {
      date4.onChange(option)
    }
  }, [])

  const handleSave: SubmitHandler<ProfileFormData> = (
    event: ProfileFormData
  ) => {
    console.log({ event })
    const reformattedEvent = {
      pictureUpload: image.myFile,
      locations: [
        event.location1,
        event.location2,
        event.location3,
        event.location4,
      ],
      dates: [event.date1, event.date2, event.date3, event.date4],
      promptResponses: [
        event.contactInfo,
        event.careerPrompt,
        event.enviroPrompt,
        event.traitsPrompt,
        event.hobbiesPrompt,
      ],
    }
    axios
      .post(`http://localhost:8080/users/${id}`, reformattedEvent, {
        withCredentials: true,
      })
      .then((res) => {
        // setIsDisabled(!isDisabled)
        // setFormData(event)
        setFetchedUserInfo(res.data)
        toast.success('Profile Info Submitted!')
        console.log(res)
        reset(event)
        // window.location.reload()
      })
      .catch((e) => toast.error('There was an error!'))
  }

  console.log(fetchedUserInfo)
  const userProfilePicture =
    image.myFile || fetchedUserInfo.pictureUpload || profile
  return (
    <div className="flex items-center justify-center h-[90%]">
      <form
        className="border-4 border-solid border-black rounded-lg mb-16"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="p-10">
          {/* fetch and render name */}
          <h1>{userInfo?.username}</h1>
          <h1>{userInfo?.email}</h1>
        </div>
        <div className="p-10">
          <label htmlFor="pictureUpload" className="cursor-pointer">
            Select a profile picture to upload
            <img
              src={userProfilePicture}
              alt="ProfilePicture"
              className="w-16 h-16 rounded-xl"
            />
          </label>
          <input
            type="file"
            id="pictureUpload"
            accept=".jpeg, .jpg, .png"
            className="hidden"
            name="pictureUpload"
            // {...register('pictureUpload', {
            //   onChange: (e) =>{handleFileUpload(e)}
            // })}
            // {...register('pictureUpload')}
            onChange={(e) => handleFileUpload(e)}
            // {...pictureUpload}
            // onChange={(e) => {
            //   pictureUpload.onChange(e)
            //   handleFileUpload(e)
            // }}
          />
        </div>
        <div className="p-10">
          <div className="p-5">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <ReactDatePicker
              // value={
              //   fetchedUserInfo &&
              //   fetchedUserInfo.dates &&
              //   fetchedUserInfo?.dates[0].slice(
              //     0,
              //     fetchedUserInfo.dates[0].indexOf('T')
              //   )
              // }
              id="date1"
              name="date1"
              selected={date1.value}
              onChange={(date) => handleDateChange('date1', date)}
              className=""
            />
            <label htmlFor="location1">Location</label>
            <input
              type="text"
              //   placeholder="Starbucks"
              id="location1"
              {...register('location1')}
            />
          </div>
          <div className="p-5">
            <label htmlFor="date2" className="form-label">
              Date
            </label>
            <ReactDatePicker
              id="date2"
              name="date2"
              selected={date2.value}
              onChange={(date) => handleDateChange('date2', date)}
              className=""
            />
            <label htmlFor="location2">Location</label>
            <input
              type="text"
              id="location2"
              {...register('location2')}
            />
          </div>
          <div className="p-5">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <ReactDatePicker
              id="date3"
              name="date3"
              selected={date3.value}
              onChange={(date) => handleDateChange('date3', date)}
              className=""
            />
            <label htmlFor="location3">Location</label>
            <input
              type="text"
              id="location3"
              {...register('location3')}
            />
          </div>
          <div className="p-5">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <ReactDatePicker
              id="date4"
              name="date4"
              selected={date4.value}
              onChange={(date) => handleDateChange('date4', date)}
              className=""
            />
            <label htmlFor="location4">Location</label>
            <input
              type="text"
              id="location4"
              {...register('location4')}
            />
          </div>
        </div>
        <div className="p-10">
          <label htmlFor="contactInfo">
            My instagram handle/email/number is...
          </label>
          <input
            type="text"
            id="contactInfo"
            {...register('contactInfo')}
          />
        </div>
        <div className="p-10">
          <label htmlFor="careerPrompt">
            What are your career aspirations?
          </label>
          <input
            // defaultValue={
            //   fetchedUserInfo &&
            //   fetchedUserInfo.promptResponses &&
            //   fetchedUserInfo?.promptResponses[0]
            // }
            type="text"
            id="careerPrompt"
            {...register('careerPrompt')}
          />
        </div>
        <div className="p-10">
          <label htmlFor="enviroPrompt">
            What is your ideal study environment?
          </label>
          <input
            type="text"
            id="enviroPrompt"
            {...register('enviroPrompt')}
          />
        </div>
        <div className="p-10">
          <label htmlFor="traitsPrompt">
            What are 3 traits you're looking for in a study buddy?
          </label>
          <input
            type="text"
            id="traitsPrompt"
            {...register('traitsPrompt')}
          />
        </div>
        <div className="p-10">
          <label htmlFor="hobbiesPrompt">
            Outside of studying/working, what do you like to do for fun?
          </label>
          <input
            type="text"
            id="hobbiesPrompt"
            {...register('hobbiesPrompt')}
          />
        </div>
        <button type="submit" className="ml-80">
          Submit
        </button>
      </form>
      <Navbar />
    </div>
  )
}
export default Profile
