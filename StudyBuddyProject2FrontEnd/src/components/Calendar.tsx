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
  const { id } = useParams()
  const [savedEvents, setSavedEvents] = useState([])

  //fetch all events assoc w/ user
  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`, { withCredentials: true })
      .then((res) => setSavedEvents(res.data.savedEvents))
      .catch((e) => console.log(e))
  }, [])

 console.log(savedEvents)

//function used to reformat event data for the calendar to present
  const transformEvents = (events: SavedEvents[]): TransformedEvent[] => {
    for(let i = 0; i < events.length; i++) {
      if (events[i] == null) {
        const todaysDate = new Date()
        events[i] = {location: "no events chosen", date: todaysDate.toString()}
      }
    }
    return events.map((event) => {
      const currentDate = new Date(event.date)
      const endDate = new Date(event.date)
      endDate.setDate(endDate.getDate() + 1)
      const eventLocation = "no events chosen"
      return {
        EndTime: endDate.toISOString().split('T')[0],
        StartTime: currentDate.toISOString().split('T')[0],
        Subject: eventLocation,
      }
    })
  }
  const eventsData: EventSettingsModel = {

    dataSource: transformEvents(savedEvents),
  }



  return (
    <section className="bg-pink-300">
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
