import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA7eFR2Ewig4MMghRn0N7h6vJr9givJ1Gg",
  authDomain: "netflix-clone-b5902.firebaseapp.com",
  projectId: "netflix-clone-b5902",
  storageBucket: "netflix-clone-b5902.firebasestorage.app",
  messagingSenderId: "746328142304",
  appId: "1:746328142304:web:f04228ed4efaeed3843b85"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);

const signup = async(name,email, password) => {
    try{
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user=res.user;
        await addDoc(collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log("Error signing up:", error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
        
    }
}

const login = async(email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log("Error logging in:", error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = () => {
    signOut(auth)
}
export { auth, db, signup, login, logout };