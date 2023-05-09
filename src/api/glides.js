
import { db } from "@db/index"
import { Timestamp, doc, collection, addDoc } from "firebase/firestore"

async function createGlide(glideData){
    const userRef = doc(db, "users", glideData.uid)

    const glide = {
        ...glideData, //in our data we have a uid, title, description, and image
        user: userRef,
        likesCount: 0,
        subglidesCount: 0,
        date: Timestamp.now()
    }

    //we will use our collection helper function to add a glide to our glides collection
    const glideCollection = collection(db, "glides")
    const addedGlide = await addDoc(glideCollection, glide)

    return {...glide, id: addedGlide.id};
}

export { createGlide }