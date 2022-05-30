
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Sidebar } from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {Dashboard} from "./sidebar-pages/Dashboard";
import {Blogs} from "./sidebar-pages/Blogs";
import {Courses} from "./sidebar-pages/Courses";
import {Projects} from "./sidebar-pages/Projects";
import {Reports} from "./sidebar-pages/Reports";
import {Payments} from "./sidebar-pages/Payments";
import {Activities} from "./sidebar-pages/Activities";
import {Settings} from "./sidebar-pages/Settings";


function App() {
  return (
    
      <div>
          <UserAuthContextProvider>
            <Routes>
            <Route path="/company-website/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />              
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/blog" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
              <Route path="/course" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="/report" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
          </UserAuthContextProvider>
          </div>
   
  );
}

export default App;