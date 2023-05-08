import { firebaseAuth, db } from "@db/index"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"


async function registerUser(form){
    //we will call here firebase auth and we will register user
    const {user: registeredUser } = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
    //the main purpose of this object is to create a document in firestore
    const user = {
        uid: registeredUser.uid,
        fullName: form.fullName,
        nickName: form.nickName,
        email: form.email,
        avatar: form.avatar,
        followers: [],
        following: [],
        followersCount: 0,
        followingCount: 0,
    };

    const userDoc = doc(db, "users", registeredUser.uid);//this will create a document in firestore
    await setDoc(userDoc, user); //we will save user to firestore
    return registeredUser;
}

export { registerUser }
