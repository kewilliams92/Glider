import { firebaseAuth, db } from "@db/index"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"


function logoutUser(){
    //we will call here firebase auth and we will logout user
    return signOut(firebaseAuth);
}

async function loginUser(form){
    //we will call here firebase auth and we will login user
    const {user} = await signInWithEmailAndPassword(firebaseAuth, form.email, form.password)
    return user;
}

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

//type will be either string of "login" or "register". Depending on the type we will call either loginUser or registerUser
function authenticate(form, type){
    return type === "login" ? loginUser(form) : registerUser(form);
}

export { logoutUser, authenticate }
