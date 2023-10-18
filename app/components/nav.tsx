import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav({ children }) {
  return (
   <nav className="flex
      gap-2
      px-4
      bg-site-blue
      h-12
      w-full
      text-white"
    >

      <div className="md:hidden w-1/6 flex items-center">
        <FontAwesomeIcon icon={faBars} />
      </div>
        
      <div className="max-md:hidden md:w-3/6 flex gap-2 h-full items-center">

        <div>
          <img src="logo.png" className="w-2/3" />
        </div>

        <div className="font-black">
          SAMPLE PAGE
        </div>

        <div>
          ICON
        </div>

        <div>
          HOME
        </div>

        <div>
          FEATURES
        </div>

        <div>
          MORE
        </div>

      </div>

      <div className="max-md:w-4/6 md:w-2/6 flex items-center py-2">
        <input
          className="h-full w-full bg-blue-900 rounded px-2"
          placeholder="Enter your search here..."
        />
      </div>

      <div className="w-1/6 flex flex-row-reverse items-center py-2">
        <button className="float-right bg-[#00d2e0] h-full px-3 rounded">Login</button>
      </div>

    </nav>
  )
}