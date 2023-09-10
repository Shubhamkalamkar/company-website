import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import "./sidebar-css/projects.css";
import { Header } from "../components/Header";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUserAuth } from "../context/UserAuthContext";

export const Projects = () => {
  const [taskSubmitLink, getTaskSubmitLink] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const { tasks, user, completeTasks,setSubmitReload } = useUserAuth();

  var connecting = "taskSubmit";
  var connect = connecting.concat("", user.email);

  const submitLink = async (e) => {
    const taskCollectionRef = collection(db, connect);
    if (taskSubmitLink) {
      if (completeTasks.length + 1 === tasks.length) {
        await addDoc(taskCollectionRef, {
          submitTask: taskSubmitLink,
          taskNo:completeTasks.length + 1,
        });
        alert("Task Submitted !!  Submit Your Task Only Once");
        getTaskSubmitLink("");
        setSubmitReload("update");
        setIsButtonDisable(true);
      } else {
        alert("You Can Submit Your Task Only Once");
        setIsButtonDisable(true);
      }
    } else {
      alert("enter task link");
    }
  };

  useEffect(()=>{
    if (completeTasks.length === tasks.length) {
      setIsButtonDisable(true);
    }
  }, []);

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
                    <img
                      className="task_img"
                      src={task.img_url}
                      alt="task img"
                    />
                    <div>
                      <p className="img_source">
                        image source - {task.img_source}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <div className="submit-link">
            <input disabled={isButtonDisable}
              type="text"
              value={taskSubmitLink}
              onChange={(e) => {
                getTaskSubmitLink(e.target.value);
              }}
              placeholder="paste your Link here"
            />
            <button disabled={isButtonDisable} onClick={submitLink}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
