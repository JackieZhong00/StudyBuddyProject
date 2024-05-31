import axios from 'axios'
import toast from 'react-hot-toast'
interface LocationDateCardProps {
  date: string
  location: string
  id: string | undefined
}

const LocationDateCard = ({
  date,
  location,
  id
}: LocationDateCardProps) => {
  const addEvent = () => {
    const event = { savedEvent: {date, location} }
    axios
      .post(`http://localhost:8080/users/events/${id}`, event, {withCredentials: true})
      .then((res) => toast.success('Event Successfully Added'))
      .catch((e) => toast.error('There was an error!'))
  }

  return (
    <button
      className="border border-solid border-black bg-white rounded-lg w-28 h-40 overflow-y-auto"
      onClick={addEvent}
    >
      <div>
        <h3>{date}</h3>
        <br></br>
        <p>{location}</p>
      </div>
    </button>
  )
}

export default LocationDateCard
