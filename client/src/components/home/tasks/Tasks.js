import React, { useState } from "react";
import { Header } from "../header/Header";
import environment from "../../../environment";

export const Tasks = () => {
  const jsonString = localStorage.getItem("user");

  // Convert it back to an object
  const user = JSON.parse(jsonString);

  const [selectedTaskId, setSelectedTaskId] = useState();
  const [selectedInternId, setSelectedInternId] = useState([]);
  console.log(selectedTaskId);
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    referenceImg: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append the fields you want to send
    formDataToSend.append("_id", formData._id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    // Append the file if it exists
    if (formData.referenceImg) {
      formDataToSend.append("referenceImg", formData.referenceImg);
    } else {
      return alert("upload image");
    }

    fetch(`${environment.baseURL}tasks/create`, {
      method: "POST",
      headers: {
        token: user.token,
      },
      body: formDataToSend, // Use the FormData object for the body
    })
      .then((data) => {
        if (data.ok) {
        }
        return data.json();
      })
      .then((data) => {
        alert(data.Message);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div>
          <h1>Create new Task</h1>
          <form>
            <label htmlFor="_id">Enter Task Id</label>
            <input
              type="number"
              id="_id"
              required
              value={formData._id}
              onChange={(e) =>
                setFormData({ ...formData, _id: e.target.value })
              }
            />
            <br />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <br />
            <label htmlFor="description">Task Description</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <br />
            <label htmlFor="referenceImg">Select Image</label>
            <input
              type="file"
              id="referenceImg"
              name="referenceImg"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, referenceImg: file });
              }}
            />
            <br />
            <button onClick={handleSubmit}>submit</button>
          </form>
        </div>
        <hr />
        <h1>assign Task</h1>
        <div>
          <h3>select task id</h3>
          <select
            name="tasks"
            id="tasks"
            onChange={(e) => {
              const newValue = e.target.value;
              setSelectedTaskId(newValue);
            }}
          >
            <option value="">select task id</option>
            <option value="8867">8867</option>
            <option value="88637">8867</option>
          </select>
          {selectedTaskId && <p>task id selected is {selectedTaskId}</p>}

          <h3>select interns id to assign task</h3>
          <select
            name="tasks"
            id="tasks"
            onChange={(e) => {
              const newValue = e.target.value;
              setSelectedInternId((prevSelectedInternIds) => [
                ...prevSelectedInternIds,
                newValue,
              ]);
            }}
          >
            <option value="">select intern id</option>
            <option value="6756" disabled={selectedInternId.includes("6756")}>
              8867
            </option>
            <option value="5675" disabled={selectedInternId.includes("5675")}>
              8867
            </option>
          </select>
          {/* {selectedInternId.map((id)=>{
console.log(id)
        })}} */}
          {selectedInternId.length > 0 && (
            <p>
              intern id selected is{" "}
              {selectedInternId.map((id) => (
                <span key={id}>, {id}</span>
              ))}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
