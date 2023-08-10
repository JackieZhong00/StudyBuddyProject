import { useForm, SubmitHandler, useController } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import getUserProfile from '../actions/getUserProfile'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'

// interface ProfileProps {
//   currentUser?: User | null
//   userProfile?: Answers | null
// }

type ProfileFormData = {
  date1: Date
  date2: Date
  date3: Date
  date4: Date
  location1: string
  location2: string
  location3: string
  location4: string
  careerPrompt: string
  enviroPrompt: string
  traitsPrompt: string
  hobbiesPrompt: string
}

interface UserData{
  email: string,
  username: string,
  dates: [Date],
  locations: [string],
  promptResponses:[string],
  _id: string

}

interface UseParams {
  id: string
}

const Profile = () => {
  // console.log(currentUser)
  // const [isDisabled, setIsDisabled] = useState(false)
  const [fetchedUserInfo, setFetchedUserInfo] = useState<UserData | {}>({})

  const {id} = useParams<UseParams>()

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then((res) => {
        setFetchedUserInfo(res.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  const schema: ZodType<ProfileFormData> = z.object({
    date1: z.date(),
    date2: z.date(),
    date3: z.date(),
    date4: z.date(),
    location1: z.string().max(150),
    location2: z.string().max(150),
    location3: z.string().max(150),
    location4: z.string().max(150),
    careerPrompt: z.string().max(250),
    enviroPrompt: z.string().max(250),
    traitsPrompt: z.string().max(250),
    hobbiesPrompt: z.string().max(250),
  })

  // console.log(userProfile)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  })

  //   const watchDates = watch(['date1', 'date2'])

  const { field: date1 } = useController({ name: 'date1', control })
  const { field: date2 } = useController({ name: 'date2', control })
  const { field: date3 } = useController({ name: 'date3', control })
  const { field: date4 } = useController({ name: 'date4', control })

  //   const handleDate1Change = (option: Date | null) => {
  //     date1.onChange(option)
  //   }

  //   const handleDate2Change = (option: Date | null) => {
  //     date2.onChange(option)
  //   }

  const handleDateChange = (name: string, option: Date | null) => {
    if (name === 'date1') {
      date1.onChange(option)
    } else if (name === 'date2') {
      date2.onChange(option)
    } else if (name === 'date3') {
      date3.onChange(option)
    } else {
      date4.onChange(option)
    }
  }

  const handleSave: SubmitHandler<ProfileFormData> = (event: ProfileFormData) => {
    // console.log({event})

    axios
      .post('/api/profileForm', event)
      .then(() => {
        // setIsDisabled(!isDisabled)
        // setFormData(event)
        console.log(event)
        window.location.reload()
      })
      .catch((e) => alert(e))
  }

  return (
    <div className="flex items-center justify-center h-[90%]">
      <form
        className="border-4 border-solid border-black rounded-lg mb-16"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="p-10">
          {/* fetch and render name */}
          {/* <h1>{fetchedUserInfo?.name}</h1>
          <h1>{fetchedUserInfo?.email}</h1> */}
        </div>
        <div className="p-10">
          <h1>picture</h1>
        </div>
        <div className="p-10">
          <div className="p-5">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <ReactDatePicker
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
              {...register('location1', {
                required: 'This is required',
                maxLength: { value: 150, message: 'max char length is 150' },
              })}
            />
            <p>{errors.location1?.message}</p>
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
              //   placeholder="Starbucks"
              {...register('location2', {
                required: 'This is required',
                maxLength: { value: 150, message: 'max char length is 150' },
              })}
            />
            <p>{errors.location2?.message}</p>
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
              //   placeholder="Starbucks"
              {...register('location3', {
                required: 'This is required',
                maxLength: { value: 150, message: 'max char length is 150' },
              })}
            />
            <p>{errors.location3?.message}</p>
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
              //   placeholder="Starbucks"
              {...register('location4', {
                required: 'This is required',
                maxLength: { value: 150, message: 'max char length is 150' },
              })}
            />
            <p>{errors.location4?.message}</p>
          </div>
        </div>
        <div className="p-10">
          <label htmlFor="careerPrompt">
            What are your career aspirations?
          </label>
          <input
            type="text"
            id="careerPrompt"
            // placeholder='Software Engineer'
            {...register('careerPrompt', {
              required: 'This is required',
              maxLength: { value: 250, message: 'max char length is 250' },
            })}
          />
          <p>{errors.careerPrompt?.message}</p>
        </div>
        <div className="p-10">
          <label htmlFor="enviroPrompt">
            What is your ideal study environment?
          </label>
          <input
            type="text"
            id="enviroPrompt"
            // placeholder='Coffee shop ambiance'
            {...register('enviroPrompt', {
              required: 'This is required',
              maxLength: { value: 250, message: 'max char length is 250' },
            })}
          />
          <p>{errors.enviroPrompt?.message}</p>
        </div>
        <div className="p-10">
          <label htmlFor="traitsPrompt">
            What are 3 traits you're looking for in a study buddy?
          </label>
          <input
            type="text"
            id="traitsPrompt"
            // placeholder='kind, encouraging, consistent'
            {...register('traitsPrompt', {
              required: 'This is required',
              maxLength: { value: 250, message: 'max char length is 250' },
            })}
          />
          <p>{errors.traitsPrompt?.message}</p>
        </div>
        <div className="p-10">
          <label htmlFor="hobbiesPrompt">
            Outside of studying/working, what do you like to do for fun?
          </label>
          <input
            type="text"
            id="hobbiesPrompt"
            // placeholder='birdwatching'
            {...register('hobbiesPrompt', {
              required: 'This is required',
              maxLength: { value: 250, message: 'max char length is 250' },
            })}
          />
          <p>{errors.hobbiesPrompt?.message}</p>
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
