import calendar from '../images/calendar.jpg'
import profile from '../images/profile.jpg'
import search from '../images/search.jpg'
import { useParams } from 'react-router-dom'


interface UseParams {
  id: string
}

const Navbar = () => {
  const { id } = useParams<UseParams>()
  return (
    <div className="fixed bottom-0 flex justify-center align-middle w-full ">
      <a className="px-16" href={`/explore/${id}`}>
        <img src={search} className="rounded-full w-12 h-12" />
      </a>
      <a className="px-16" href={`/calendar/${id}`}>
        <img src={calendar} className="rounded-full w-12 h-12 aspect-video" />
      </a>
      <a className="px-16" href={`/profile/${id}`}>
        <img src={profile} className="rounded-full w-12 h-12" />
      </a>
    </div>
  )
}
export default Navbar
