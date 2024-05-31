import { useForm, SubmitHandler, useController } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'


import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import profile from '../images/profile.jpg'

import axios from 'axios'
import Navbar from './Navbar'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PromptComponent } from './PromptComponent'

export type ProfileFormData = {
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
}

type UserData = {
  email: string
  username: string
  dates: Date[]
  locations: string[]
  contactInfo: string
  promptResponses: string[]
  pictureUpload: string
  _id: string
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
  const [image, setImage] = useState({ myFile: '' })
  const [fetchedUserInfo, setFetchedUserInfo] = useState<UserData | {}>({})

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setFetchedUserInfo(res.data)
        setImage(res.data.pictureUpload)
      })
      .catch((error) => console.log(error))
  }, [id])

  const userInfo = useMemo(() => fetchedUserInfo, [fetchedUserInfo])
  //this is called when a file is uploaded (onchange func of input element) --> sets image stateValue --> this state value is used in onSubmit func later on
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
    setError,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const response = await fetch(`http://localhost:8080/users/${id}`, {method: "GET", "credentials": "include"})
      const data = await response.json()
      console.log(data)
      return {
        date1: new Date(Date.parse(data.dates[0])),
        date2: new Date(Date.parse(data.dates[1])),
        date3: new Date(Date.parse(data.dates[2])),
        date4: new Date(Date.parse(data.dates[3])),
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

  //function that is passed to handlesubmit, designating it as func that handles form submission
  const handleSave: SubmitHandler<ProfileFormData> = async (
    event: ProfileFormData
  ) => {
    try {
    const reformattedEvent = {
      pictureUpload: image,
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
    const res = await axios
      .post(`http://localhost:8080/users/${id}`, reformattedEvent, {
        withCredentials: true,
      })
    setFetchedUserInfo(res.data)
    toast.success("Profile Info Submitted!")
    reset(event)
    } catch (error) {
      toast.error(`You've ran into this error: ${error}`)
    }
    
  }

  console.log(fetchedUserInfo)
  const userProfilePicture =
    image.myFile || fetchedUserInfo.pictureUpload || profile
  return (
    <div className="absolute bg-pink-300 ">
      <form className="" onSubmit={handleSubmit(handleSave)}>
        <section className="flex flex-row w-screen justify-center">
          <div className="p-10">
            <label htmlFor="pictureUpload" className="cursor-pointer">
              <img
                src={userProfilePicture}
                alt="ProfilePicture"
                className="w-36 h-36 aspect-auto rounded-full border boreder-solid"
              />
            </label>
            <input
              type="file"
              id="pictureUpload"
              accept=".jpeg, .jpg, .png"
              className="hidden"
              name="pictureUpload"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className="p-10">
            <h1 className="py-3">Username: {userInfo?.username}</h1>
            <h1 className="py-3">Email: {userInfo?.email}</h1>
          </div>
        </section>

        <div className="flex flex-wrap p-10 mt-10">
          <div className="w-1/2 p-5">
            <label htmlFor="date" className="form-label mr-5">
              Date:
            </label>
            <ReactDatePicker
              id="date1"
              name="date1"
              selected={date1.value}
              onChange={(date) => handleDateChange('date1', date)}
              className="border border-solid border-black rounded-md p-1 mr-10 bg-white"
            />
            <label htmlFor="location1" className="mr-5">
              Location:
            </label>
            <input
              className="border border-solid border-white bg-white rounded-md p-1"
              type="text"
              id="location1"
              {...register('location1')}
            />
          </div>
          <div className="w-1/2 p-5">
            <label htmlFor="date2" className="form-label mr-5">
              Date:
            </label>
            <ReactDatePicker
              id="date2"
              name="date2"
              selected={date2.value}
              onChange={(date) => handleDateChange('date2', date)}
              className="border border-solid border-black rounded-md p-1 mr-10 bg-white "
            />
            <label htmlFor="location2" className="mr-5">
              Location:
            </label>
            <input
              className="border border-solid border-black bg-white text-black rounded-md p-1"
              type="text"
              id="location2"
              {...register('location2')}
            />
          </div>
          <div className="w-1/2 p-5">
            <label htmlFor="date" className="form-label mr-5">
              Date:
            </label>
            <ReactDatePicker
              id="date3"
              name="date3"
              selected={date3.value}
              onChange={(date) => handleDateChange('date3', date)}
              className="border border-solid border-black rounded-md p-1 mr-10 bg-white text-black"
            />
            <label htmlFor="location3" className="mr-5">
              Location:
            </label>
            <input
              className="border border-solid border-black bg-white text-black rounded-md p-1"
              type="text"
              id="location3"
              {...register('location3')}
            />
          </div>
          <div className="w-1/2 p-5">
            <label htmlFor="date" className="form-label mr-5">
              Date:
            </label>
            <ReactDatePicker
              id="date4"
              name="date4"
              selected={date4.value}
              onChange={(date) => handleDateChange('date4', date)}
              className="border border-solid border-black rounded-md p-1 mr-10 bg-white text-black"
            />
            <label htmlFor="location4" className="mr-5">
              Location:
            </label>
            <input
              className="border border-solid border-black bg-white rounded-md p-1"
              type="text"
              id="location4"
              {...register('location4')}
            />
          </div>
        </div>
        <section className="">
          <div className="p-10">
            <label htmlFor="contactInfo">
              My instagram handle/email/number is...
            </label>
            <textarea
              rows={5}
              cols={50}
              id="contactInfo"
              className="border border-solid border-white rounded-md bg-white block"
              {...register('contactInfo')}
            />
          </div>
          <div className="p-10">
            <label htmlFor="careerPrompt" className="">
              What are your career aspirations?
            </label>
            <textarea
              rows={5}
              cols={50}
              id="careerPrompt"
              className="border border-solid border-white rounded-md bg-white block"
              {...register('careerPrompt')}
            />
          </div>
          <div className="p-10">
            <label htmlFor="enviroPrompt">
              What is your ideal study environment?
            </label>
            <textarea
              rows={5}
              cols={50}
              id="enviroPrompt"
              className="border border-solid border-white rounded-md bg-white block"
              {...register('enviroPrompt')}
            />
          </div>
          <div className="p-10">
            <label htmlFor="traitsPrompt">
              What are 3 traits you're looking for in a study buddy?
            </label>
            <textarea
              rows={5}
              cols={50}
              id="traitsPrompt"
              className="border border-solid border-white rounded-md bg-white block"
              {...register('traitsPrompt')}
            />
          </div>
          <div className="p-10">
            <label htmlFor="hobbiesPrompt">
              Outside of studying/working, what do you like to do for fun?
            </label>
            <textarea
              rows={2}
              cols={50}
              id="hobbiesPrompt"
              className="border border-solid border-white rounded-md bg-white block"
              {...register('hobbiesPrompt')}
            />
          </div>
          <PromptComponent label={"a"} register={register}/>
          <div className="flex flex-row justify-center mb-10">
            <button
              type="submit"
              disabled = {isSubmitting}
              className="border border-solid border-white rounded-md py-3 px-10 bg-blue-500 text-white text-xl font-bold"
            >
              {isSubmitting ? "Loading" : "Submit" }
            </button>
          </div>
        </section>
      </form>
      <div className="fixed top-10 flex-col justify-center align-middle ml-10 h-full">
        <Navbar />
      </div>
    </div>
  )
}
export default Profile
