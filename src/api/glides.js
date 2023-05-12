import { db } from '@db/index';
import {
	onSnapshot,
	Timestamp,
	doc,
	collection,
	addDoc,
	getDocs,
	getDoc,
	query,
	orderBy,
	limit,
	startAfter,
	where,
	setDoc
} from 'firebase/firestore';

async function getGlidesFromDocuments(qSnapShot){
        //We are using Promise.all to wait for all of our glides to be fetched
        return await Promise.all(qSnapShot.docs.map(async doc => {
            const glide = doc.data();
            const userSnapshot = await getDoc(glide.user);
            glide.user = userSnapshot.data();
    
            return {...glide, id: doc.id, lookup: doc.ref.path}
        }));
}

function onGlideSnapShot(loggedInUser, callback) {
	const watchCollection = collection(db, 'glides');

	const constraints = [
		where('date', '>', Timestamp.now()),
		where('user', 'in', loggedInUser.following)
	];

	const q = query(watchCollection, ...constraints);

	return onSnapshot(q, async (qSnapshot) => {
		//We are using Promise.all to wait for all of our glides to be fetched
		const glides = await getGlidesFromDocuments(qSnapshot);
		callback(glides);
	});
}

async function fetchGlide(uid, id){
	//first we will get the user document reference
	const userDocRef = doc(db, 'users', uid);
	const userGlideRef = doc(userDocRef, 'glides', id);
	//then we will get the user glide document
	const userGlideSnapshot = await getDoc(userGlideRef);
	const userGlide = userGlideSnapshot.data();
	//next we will get the glide document
	const glideSnapshot = await getDoc(userGlide.lookup);
	const userSnap = await getDoc(userDocRef);
	//then we will create a glide object
	const glide = { 
		...glideSnapshot.data(),
		user: userSnap.data(),
		id: glideSnapshot.id,
		lookup: glideSnapshot.ref.path
	}
	//finally we will return the glide object
	return glide;
}

async function fetchGlides(lastGlideDoc, loggedInUser) {
	const _loggedInUserRef = doc(db, 'users', loggedInUser.uid);
	const constraints = [orderBy('date', 'desc'), limit(10)];

	//if the user is following someone, we will get the glides of the people they are following
	if (loggedInUser.following.length > 0) {
		constraints.push(where('user', 'in', [...loggedInUser.following, _loggedInUserRef]));
	} else {
		constraints.push(where('user', '==', _loggedInUserRef));
	}

	//whenever we call this function we will pass in the last glide document
	if (lastGlideDoc) {
		constraints.push(startAfter(lastGlideDoc));
	}

	//we will use our query helper function to get all of the glides from our glides collection
	const q = query(collection(db, 'glides'), ...constraints);
	const qSnapShot = await getDocs(q);

	//we will use the last glide document to get the next 10 glides
	const _lastGlideDoc = qSnapShot.docs[qSnapShot.docs.length - 1];

	//We are using Promise.all to wait for all of our glides to be fetched
	const glides = await getGlidesFromDocuments(qSnapShot);

	return { glides, lastGlideDoc: _lastGlideDoc };
}

async function createGlide(glideData) {
	const userRef = doc(db, 'users', glideData.uid);

	const glide = {
		...glideData, //in our data we have a uid, title, description, and image
		user: userRef,
		likesCount: 0,
		subglidesCount: 0,
		date: Timestamp.now()
	};

	//we will use our collection helper function to add a glide to our glides collection
	const glideCollection = collection(db, 'glides');
	const addedGlide = await addDoc(glideCollection, glide);

	const userGlideRef = doc(userRef, "glides", addedGlide.id);
	await setDoc(userGlideRef, {lookup: addedGlide});

	return { ...glide, id: addedGlide.id, lookup: addedGlide.path };
}

export { createGlide, fetchGlides, onGlideSnapShot, fetchGlide};
