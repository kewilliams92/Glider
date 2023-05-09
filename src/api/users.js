import { doc, getDoc } from "firebase/firestore";
import { db } from "@db/index";

async function getUser(uid){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export { getUser };