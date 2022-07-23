import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import "./sidebar-css/projects.css";
import { Header } from "../components/Header";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";


import { auth } from "../firebase";


export const Projects = () => {
  //trying for task
  const [tasks, setTasks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [taskSubmitLink, getTaskSubmitLink] = useState("");

  var connecting = "taskSubmit";
   var connect = connecting.concat("",userEmail);

    const submitLink = async (e)=>{
    const taskCollectionRef = collection(db, connect);
      await addDoc(taskCollectionRef, {
        submitTask: taskSubmitLink
      })
      alert("Task Submitted !!  Submit Your Task Only Once");
      getTaskSubmitLink("");
    }


  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      // console.log(user);

      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });

    //trying for tasks
    const getTasks = async () => {
      
      const taskCollectionRef = collection(db, userEmail);
      const taskData = await getDocs(taskCollectionRef);
      // console.log(taskData);

      setTasks(taskData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(tasks);
    };
    getTasks();

    

  }, [userEmail]);

    
  // console.log(userEmail);
  

  // const taskData = [
  //   {
  //     tag1: "Task 1",
  //     tag2: "Important",
  //     tag3: "Task",
  //     question: "Upload Offer Letter",
  //     question_detail:
  //       "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
  //   },

  // ];
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="dashboard-container">
        <div>
          <Sidebar />
        </div>

        <div className="project-container">
          {/* <div className="task-container">
            <div>
              <div className="project-tags">
                <p className="project-tags-p">Task 1</p>
                <p className="project-tags-p">Important</p>
                <p className="project-tags-p">Task</p>
              </div>
              <h2>Upload Offer Letter</h2>
              <h3>
                Upload Your Offer Letter On Linkedin and tag Digitalguruindia
                and follow digitalguruindia. and submit post link below
              </h3>

              <a
                href="https://media.istockphoto.com/vectors/guru-meditation-vector-vector-id987353740?s=612x612"
                target="_blank"
              >
                <button className="img-button">View Image</button>
              </a>
              <div className="submit-link">
                <input type="text" placeholder="paste your Link here" />
                <button>Submit</button>
              </div>
            </div>
          </div> */}

          {/* {taskData.map((val, i) => {
            return (
              <div className="task-container">
                <div>
                  <div className="project-tags">
                    <p className="project-tags-p">{val.tag1}</p>
                    <p className="project-tags-p">{val.tag2}</p>
                    <p className="project-tags-p">{val.tag3}</p>
                  </div>
                  <h2>{val.question}</h2>
                  <h3>
                    {val.question_detail}
                  </h3>
                  <div className="submit-link">
                    <input type="text" placeholder="paste your Link here" />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            );
          })} */}

          {/* trying for tasks */}
          {tasks.map((task, i) => {
            return (
              <>
                <div className="task-container">
                  <div>
                    <div className="project-tags">
                      <p className="project-tags-p">{task.tag1}</p>
                      <p className="project-tags-p">{task.tag2}</p>
                      <p className="project-tags-p">{task.tag3}</p>
                    </div>
                    <h2>{task.question}</h2>
                    <h3>{task.question_detail}</h3>

                    {/* <a href={task.img_url} target="_blank">
                      <button onClick={view_img.bind(task.img_url)} className="img-button">View Image</button>
                    </a> */}
                    <img className="task_img" src={task.img_url} alt="task img" />
                    <div><p className="img_source">image source - {task.img_source}</p></div>

                    <div className="submit-link">
                      <input type="text" value={taskSubmitLink} onChange={(e)=>{getTaskSubmitLink(e.target.value)}} placeholder="paste your Link here" />
                      <button onClick={submitLink}>Submit</button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
