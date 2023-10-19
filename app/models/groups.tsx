import {dbConnect} from '../dbConnect';

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export async function getAllGroups(): Promise<any[]> {

  interface Group {
    _id: number,
    name: string,
  }

  type GroupSummary = Pick<Group, "_id", "name">;

  try {
    
    const feed = []

    // Connect the client to the server (optional starting in v4.7)
    const database = dbConnect().db("sample_app");
    
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const groups = database.collection<Group>("subjects");
  
    const query = {}

    const cursor = await groups.find<GroupSummary>(
      query
    );

    if ((await groups.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }
    else {
      //console.log(reviews.countDocuments(query) +' rows found');
    }

    return render(cursor)

  } finally {
    // Ensures that the dbConnent() will close when you finish/error
    await dbConnect().close();

  }

}

export async function render(cursor) {

  const feed = []

  for await (const doc of cursor) {
      //console.log(doc);

      feed.push(
        <div className="w-full
          bg-white
          rounded-md"
          key="{doc._id">
            <div className="flex items-start py-2">
              <div className="w-[14%]">
                <FontAwesomeIcon className="text-[10px]" icon={faUser} />
              </div>
              <div className="w-[66%]">
                <div className="font-bold">{doc.name} s</div>
              </div>
              <div className="w-[20%]">
                <div >
                  <img src="icon-world.png" className="inline w-3 h-3" />
                </div>
              </div>
            </div>
        </div>
      );
    }

    return feed;

}