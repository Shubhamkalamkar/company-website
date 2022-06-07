import React from 'react'
import { Sidebar } from '../components/Sidebar'
import "./sidebar-css/projects.css";
import { Header } from '../components/Header';

export const Projects = () => {
  return (
    <>
    <div>
        <Header />
      </div>
      <div className="dashboard-container">
    <div>
      <Sidebar/>
    </div>
    <div className='project-container'>
      <div className='task-container'>
        <h1>Task 1</h1>
      </div>
      <div className='task-container'>
        <h1>Task 2</h1>
      </div>
      <div className='task-container'>
        <h1>Task 3</h1>
      </div>
      <div className='task-container'>
        <h1>Task 4</h1>
      </div>
      <div className='task-container'>
        <h1>Task 5</h1>
      </div>
      <div className='task-container'>
        <h1>Task 6</h1>
      </div>
      <div className='task-container'>
        <h1>Task 7</h1>
      </div>
      <div className='task-container'>
        <h1>Task 8</h1>
      </div>
      <div className='task-container'>
        <h1>Task 9</h1>
      </div>
      <div className='task-container'>
        <h1>Task 10</h1>
      </div>
    </div>
    </div>
    </>
  )
}
