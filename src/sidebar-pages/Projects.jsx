import React from "react";
import { Sidebar } from "../components/Sidebar";
import "./sidebar-css/projects.css";
import { Header } from "../components/Header";

export const Projects = () => {
  const taskData = [
    {
      tag1: "Task 1",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 2",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 3",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 4",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 5",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 6",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 7",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 8",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 9",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
    {
      tag1: "Task 10",
      tag2: "Important",
      tag3: "Task",
      question: "Upload Offer Letter",
      question_detail:
        "Upload Your Offer Letter On Linkedin and tag Digitalguruindia and follow digitalguruindia. and submit post link below",
    },
  ];
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
          {taskData.map((val, i) => {
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
          })}
        </div>
      </div>
    </>
  );
};
