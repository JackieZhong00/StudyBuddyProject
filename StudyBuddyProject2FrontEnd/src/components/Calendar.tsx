import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  EventSettingsModel,
} from '@syncfusion/ej2-react-schedule'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { UseParams } from '../types'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface SavedEvents {
  location: string
  date: string
}

interface TransformedEvent {
  EndTime: string
  StartTime: string
  Subject: string
}

const Calendar = () => {
  const { id } = useParams<UseParams>()
  const [savedEvents, setSavedEvents] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`, { withCredentials: true })
      .then((res) => setSavedEvents(res.data.savedEvents))
      .catch((e) => console.log(e))
  }, [])

 

  const transformEvents = (events: SavedEvents[]): TransformedEvent[] => {
    return events.map((event) => {
      const currentDate = new Date(event.date)
      const endDate = new Date(event.date)
      endDate.setDate(endDate.getDate() + 1)

      return {
        EndTime: endDate.toISOString().split('T')[0],
        StartTime: currentDate.toISOString().split('T')[0],
        Subject: event.location,
      }
    })
  }
  const eventsData: EventSettingsModel = {

    dataSource: transformEvents(savedEvents),
  }

  console.log(savedEvents)

  return (
    <section className="bg-black">
      <div className="fixed top-10 flex-col justify-center align-middle ml-10 h-full">
        <Navbar />
      </div>
      <h1 className='flex absolute top-[20%] left-[40%] text-white text-4xl font-bold'>Saved Study Dates</h1>
      <div className="pt-80 mx-10 pb-60">
        <ScheduleComponent currentView="Month" eventSettings={eventsData}>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    </section>
  )
}
export default Calendar
