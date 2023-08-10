import calendar from '../images/calendar.jpg'
import profile from '../images/profile.jpg'
import search from '../images/search.jpg'



const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex justify-center align-middle w-full ">
      <button className="px-16">
        <img src={search} className="rounded-full w-12 h-12" />
      </button>
      <button className="px-16">
        <img
          src={calendar}
          className="rounded-full w-12 h-12 aspect-video"
        />
      </button>
      <button className="px-16">
        <img src={profile} className="rounded-full w-12 h-12" />
      </button>
    </div>
  )
}
export default Navbar
