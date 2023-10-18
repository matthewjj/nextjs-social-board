import Image from 'next/image'
import {getAllPosts} from './models/posts';
import {getAllUsers} from './models/users';
import {getAllGroups} from './models/groups';

export default async function Home() {

  const users = await getAllUsers();
  const feed = await getAllPosts();
  const groups = await getAllGroups();

  return (
    <main>

      <div className="flex flex-wrap gap-2">
        
        {/* BANNER */}



        <div style={{backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)"}} className="w-full rounded-md p-4 text-white">
          
          <p className="text-[18pt] font-black">Newsfeed</p>
          <p className="text-[9pt]">Check what your friends have been up to!</p>

        </div>


        {/* DYNAMIC CONTENT */}

        <div className="w-full flex max-md:flex-col gap-2">
          
          {/* LEFT */}

          <div className="max-md:w-full md:w-1/4 flex flex-col">

            <div className="w-full bg-white rounded-md p-2">
              <p className="font-bold">Newest Members</p>
              {users}
            </div>

          </div>

          {/* CENTER */}

          <div className="max-md:w-full md:w-2/4 flex flex-col gap-2">

            <div className="w-full bg-white rounded-md p-2 flex">

              <div className="w-2/3">
                
                <p className="font-bold">All Updates</p>
              
              </div>

              <div className="w-1/3">
               
                  <select className="border rounded-md w-full h-5">
                    <option>Everything</option>
                  </select>
               
              </div>

            </div>

            {feed}

          </div>

          {/* RIGHT */}

          <div className="max-md:w-full md:w-1/4 flex flex-col">
            
            <div className="w-full bg-white rounded-md p-2">
              <p className="font-bold">Popular Groups</p>

              {groups}

            </div>

          </div>

        </div>

      </div>

    </main>

     
  )
}
