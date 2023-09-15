import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/auth/signIn/SignIn";
import { Signup } from "./components/auth/signUp/Signup";
import {AdminDashboard} from './components/admin/dashboard/AdminDashboard'
import { NotFound } from './components/notFound/NotFound';
import { UserDashboard } from './components/user/dashboard/UserDashboard';

// redux
import { useSelector, useDispatch } from "react-redux";

function App() {
  const myState = useSelector((state) => state.changeTheNumber);
  console.log(myState)
  const dispatch = useDispatch();

  return (
    <>
      {/* redux */}
      <h1>{myState}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>

      {/* --------- */}
      <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='admindash' element={<AdminDashboard/>}/>
      <Route path='userdash' element={<UserDashboard/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
