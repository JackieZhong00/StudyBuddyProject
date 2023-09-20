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

  // function dayOfYear(dateString: string): number {
  //   const date = new Date(dateString)
  //   const startOfYear = new Date(date.getFullYear(), 0, 1) // January 1st
  //   const millisecondsInADay = 24 * 60 * 60 * 1000
  //   const dayNumber =
  //     Math.floor(
  //       (date.getTime() - startOfYear.getTime()) / millisecondsInADay
  //     ) + 1
  //   return dayNumber
  // }

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
    // dataSource: [
    //   {
    //     EndTime: new Date(2023, 0, 240, 6, 30),
    //     StartTime: new Date(2023, 0, 240, 12, 0), // amt of days, number of day (__/365), hour, minute
    //     Subject: 'testing',
    //   },
    // ],
    dataSource: transformEvents(savedEvents),
  }

  console.log(savedEvents)

  return (
    <>
      <div className="pt-52 mx-10">
        <ScheduleComponent currentView="Month" eventSettings={eventsData}>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
        <Navbar />
      </div>
    </>
  )
}
export default Calendar
