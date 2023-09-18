import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import environment from "../../../environment";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    internId: null,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch(`${environment.baseURL}user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        if (data.ok) {
          navigate("/");
        }
        return data.json();
      })
      .then((data) => {
        alert(data.Message);
        setError(data.Message);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.Message); // Set the error Message state
      });
  };

  return (
    <>
      <div className="container">
        {error && (
          <div style={{ color: "white", background: "red" }}>Error: {error}</div>
        )}{" "}
        {/* Display error Message if it exists */}
        <form>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <br />
          <label htmlFor="internId">Intern Id</label>
          <input
            type="number"
            id="internId"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, internId: e.target.value })
            }
          />
          <br />
          <button onClick={handleSubmit}>submit</button>
        </form>
        <p onClick={() => navigate("/")}>i have account signIn</p>
      </div>
    </>
  );
};
