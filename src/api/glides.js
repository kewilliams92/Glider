
import { db } from "@db/index"
import { Timestamp, doc, collection, addDoc, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore"

async function fetchGlides(){
    const constraints = [
        orderBy("date", "desc"),
        limit(10)
    ];
    //we will use our query helper function to get all of the glides from our glides collection
    const q = query(collection(db, "glides"), ...constraints);
    const qSnapShot = await getDocs(q);

    //We are using Promise.all to wait for all of our glides to be fetched
    const glides = await Promise.all(qSnapShot.docs.map(async doc => {
        const glide = doc.data();
        const userSnapshot = await getDoc(glide.user);
        glide.user = userSnapshot.data();

        return {...glide, id: doc.id}
    }));

    return { glides };
}

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

export { createGlide, fetchGlides }