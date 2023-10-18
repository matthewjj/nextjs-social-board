import {dbConnect} from '../dbConnect';

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export async function getAllUsers(): Promise<any[]> {

  interface User {
    _id: number,
    first_name: string,
    last_name: string,
    handle: string
  }

  type UsersSummary = Pick<User, "_id", "first_name", "last_name", "handle">;

  try {

    const feed = []

    // Connect the client to the server (optional starting in v4.7)
    const database = dbConnect().db("sample_app");
    
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const users = database.collection<User>("users");
  
    const query = {}

    const cursor = await users.find<UsersSummary>(
      query
    );

    if ((await users.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }
    else {
      //console.log(reviews.countDocuments(query) +' rows found');
    }

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
              <div className="w-[86%]">
                <div className="font-bold">{doc.first_name}  {doc.last_name}</div>
                <div>{doc.handle}</div>
              </div>
            </div>
        </div>
      );
    }

    return feed

  } finally {
    // Ensures that the dbConnent() will close when you finish/error
    await dbConnect().close();

  }

}