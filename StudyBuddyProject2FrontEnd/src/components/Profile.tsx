import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import profile from '../images/profile.jpg'

import axios from 'axios'
import Navbar from './Navbar'
import { useEffect, useMemo, useState } from 'react'
import { PromptComponent } from './PromptComponent'
import { DatePromptComponent } from './DatePromptComponent'
import { LocationComponent } from './LocationComponent'
import type { UserData, ProfileFormData } from '..'


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
  const [fetchedUserInfo, setFetchedUserInfo] = useState<UserData>({
    email: "",
    username: "",
    dates: [new Date],
    locations: [""],
    contactInfo: "",
    promptResponses: [""],
    pictureUpload: "",
    _id: ""

  })

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

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
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


  const {
    reset
  } = useForm<ProfileFormData>()

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
    <FormProvider {...methods}>
      <div className="absolute bg-pink-300 ">
        <form className="" onSubmit={methods.handleSubmit(handleSave)}>
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
              <DatePromptComponent
                dateLabel={'date1'}
                defaultDate={userInfo.dates[0]}
              />
              <LocationComponent
                label={'location1'}
                defaultValue={userInfo.locations[0]}
              />
              {methods.formState.errors.location1 && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
            </div>
            <div className="w-1/2 p-5">
              <DatePromptComponent
                dateLabel={'date2'}
                defaultDate={userInfo.dates[1]}
              />
              <LocationComponent
                label={'location2'}
                defaultValue={userInfo.locations[1]}
              />
              {methods.formState.errors.location2 && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
            </div>
            <div className="w-1/2 p-5">
              <DatePromptComponent
                dateLabel={'date3'}
                defaultDate={userInfo.dates[2]}
              />
              {methods.formState.errors.date3 && (
                <p className="text-red-500">Please input a valid date</p>
              )}
              <LocationComponent
                label={'location3'}
                defaultValue={userInfo.locations[2]}
              />
              {methods.formState.errors.location3 && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
            </div>
            <div className="w-1/2 p-5">
              <DatePromptComponent
                dateLabel={'date4'}
                defaultDate={userInfo.dates[3]}
              />
              <LocationComponent
                label={'location4'}
                defaultValue={userInfo.locations[3]}
              />
              {methods.formState.errors.location4 && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
            </div>
          </div>
          <section className="">
            <div>
              <PromptComponent
                name={'contactInfo'}
                label={'What is your email/ig handle?'}
                defaultValue={userInfo?.promptResponses[0]}
              />
              {methods.formState.errors.contactInfo && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
              <PromptComponent
                name={'careerPrompt'}
                label={'What are your career aspirations?'}
                defaultValue={userInfo?.promptResponses[1]}
              />
              {methods.formState.errors.careerPrompt && (
                <p className="text-red-500">
                  You've surpassed the 150 character limit
                </p>
              )}
            </div>
            <PromptComponent
              name={'enviroPrompt'}
              label={'What is your ideal study environment?'}
              defaultValue={userInfo?.promptResponses[2]}
            />
            {methods.formState.errors.enviroPrompt && (
              <p className="text-red-500">
                You've surpassed the 150 character limit
              </p>
            )}
            <PromptComponent
              name={'traitsPrompt'}
              label={'What are 3 traits you look for in a study buddy?'}
              defaultValue={userInfo?.promptResponses[3]}
            />
            {methods.formState.errors.traitsPrompt && (
              <p className="text-red-500">
                You've surpassed the 150 character limit
              </p>
            )}
            <PromptComponent
              name={'hobbiesPrompt'}
              label={
                'Outside of studying/working, what do you like to do for fun?'
              }
              defaultValue={userInfo?.promptResponses[3]}
            />
            {methods.formState.errors.hobbiesPrompt && (
              <p className="text-red-500">
                You've surpassed the 150 character limit
              </p>
            )}
            <div className="flex flex-row justify-center mb-10">
              <button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="border border-solid border-white rounded-md py-3 px-10 bg-blue-500 text-white text-xl font-bold"
              >
                {methods.formState.isSubmitting ? 'Loading' : 'Submit'}
              </button>
            </div>
          </section>
        </form>
        <div className="fixed top-10 flex-col justify-center align-middle ml-10 h-full">
          <Navbar />
        </div>
      </div>
    </FormProvider>
  )
}
export default Profile
