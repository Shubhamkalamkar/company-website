import "./App.css";
import { Route, Routes } from "react-router-dom";
import {SignIn} from './components/auth/signIn/SignIn'
import {Signup} from './components/auth/signUp/Signup'
// import { Home } from "./components/home/Home";
import { Dashboard } from "./components/home/dashboard/Dashboard";
import {NotFound} from './components/notFound/NotFound'
import { Header } from "./components/home/header/Header";
import { CreateUser } from "./components/home/users/CreateUser";
import { Tasks } from "./components/home/tasks/Tasks";

// redux
// import { useSelector, useDispatch } from "react-redux";

function App() {
  // const myState = useSelector((state) => state.changeTheNumber);
  // console.log(myState)
  // const dispatch = useDispatch();

  return (
    <>
      {/* redux */}
      {/* <h1>{myState}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button> */}

      {/* --------- */}
      {/* <Header/> */}
      <Routes >
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createuser' element={<CreateUser />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
