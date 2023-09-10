import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [reviewTasks, setReviewTasks] = useState([]);
  const [scoreTasks, setScoreTasks] = useState([]);
  const [submitReload, setSubmitReload] = useState("");

   var taskCompleteConcate = "taskSubmit";
   var taskReviewConcate = "taskReview";
   var scoreConcate = "score";

   const completeTask = taskCompleteConcate.concat("",userEmail);
   const reviewTask = taskReviewConcate.concat("",userEmail);
   const scoreTask = scoreConcate.concat("",userEmail);
  //  console.log(completeTask)


  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      setUser(currentuser);
      if (user) {
            setUserEmail(currentuser.email);
          } else {
            setUserEmail("unknown");
          }
    });

    const getTasks = async () => {
      
      const taskCollectionRef = collection(db, userEmail);
      const completeTaskCollectionRef = collection(db, completeTask);
      const reviewTaskCollectionRef = collection(db, reviewTask);
      const scoreTaskCollectionRef = collection(db, scoreTask);

      const taskData = await getDocs(taskCollectionRef);
      const completeTaskData = await getDocs(completeTaskCollectionRef);
      const reviewTaskData = await getDocs(reviewTaskCollectionRef);
      const scoreTaskData = await getDocs(scoreTaskCollectionRef);
      // console.log(completeTaskData);

      setTasks(taskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setCompleteTasks(completeTaskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setReviewTasks(reviewTaskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setScoreTasks(scoreTaskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(tasks);
    };
    getTasks();

    return () => {
      unsubscribe();
    };
  }, [userEmail, submitReload]);

  return (
    <userAuthContext.Provider
      value={{ user,tasks,completeTasks,reviewTasks,scoreTasks,setSubmitReload, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}