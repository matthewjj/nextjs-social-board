import {dbConnect} from '../dbConnect';

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export async function getAllPosts(): Promise<any[]> {

  interface Post {
    _id: number,
    text: string,
  }

  type PostSummary = Pick<Post, "text">;

  try {

    const feed = []

    // Connect the client to the server (optional starting in v4.7)
    const database = dbConnect().db("sample_app");
    
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const posts = database.collection<Post>("posts");
  
    const query = { }

    const cursor = posts.aggregate([
      {
        "$lookup": {
          "from": "users",
          "localField": "user_id",
          "foreignField": "_id",
          "as": "user"
        }
      },
      {
        "$lookup": {
          "from": "subjects",
          "localField": "subject_id",
          "foreignField": "_id",
          "as": "subject"
        }
      },
      {
        "$project": { 
          "text": 1,
          "user": { "$arrayElemAt": [ "$user", 0 ] },
          "subject": { "$arrayElemAt": [ "$subject", 0 ] }
        }
      }
    ])

    // const cursor = await posts.find<PostSummary>(
    //   query
    // );

    if ((await posts.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }
    else {
      //console.log(reviews.countDocuments(query) +' rows found');
    }

    for await (const doc of cursor) {

      let name = <span className="font-bold">{doc.user.first_name}</span>;

      let label = <span className="bg-site-blue text-white rounded-lg font-medium px-1">Member</span>

      let post = <span className="inline"> replied to the topic <span className="font-bold">{doc.subject.name}</span></span>;

      feed.push(
        <div className="w-full
          bg-white
          rounded-md
          p-6"
          key="{doc.name}">

            <div className="flex items-center">

              <div className="w-[14%] text-[10px] ">
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div className="w-[86%] ">

                <p className="inline">
                    {name} <img src="check.png" className="inline w-3 h-3" /> {label} {post}
                    
                </p>

              </div>

            </div>

            <div>
              <p>{doc.text}</p>
            </div>

            <div className="flex gap-1 items-center text-right border-t font-bold mt-2 py-2">

              <div className="w-3/5 text-left">&#128514;</div>
              <div className="w-1/5">1 Comments</div>
              <div className="w-1/5">1 Shares</div>

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