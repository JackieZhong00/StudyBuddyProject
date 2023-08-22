import axios from 'axios'
import toast from 'react-hot-toast'
interface LocationDateCardProps {
  date: string
  location: string
  id: string
}

const LocationDateCard: React.FC<LocationDateCardProps> = ({
  date,
  location,
  id
}) => {
  const addEvent = () => {
    const event = { savedEvent: {date, location} }
    axios
      .post(`http://localhost:8080/users/events/${id}`, event, {withCredentials: true})
      .then((res) => toast.success('Event Successfully Added'))
      .catch((e) => toast.error('There was an error!'))
  }

  return (
    <button
      className="border border-solid border-black bg-orange-500 rounded-lg w-28 h-40"
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
