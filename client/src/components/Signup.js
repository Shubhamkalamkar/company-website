import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [intern, setIntern] = useState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [InternError, setInternError] = useState(false);
  const [value, setValue] = useState("");

  const usersId = [];
  const { signUp } = useUserAuth();

  // firestore
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const signupCollectionRef = collection(db, "signupData")



  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // console.log(users);

    };

    getUsers();


  }, [])

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let navigate = useNavigate();

  users.map((user) => {
    return <div>{usersId.push(user.intern_id)}</div>
  })
  // console.log(usersId);


  var b = usersId.some(checkValid);
  function checkValid(id) {
    return id == intern;
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (b == true) {
      try {
        await signUp(email, password).then(async (res) => {
          const user = res.user;
          // console.log(user);
          await updateProfile(user, {
            displayName: name,

          });
        })
        await addDoc(signupCollectionRef, {
          internId: intern,
          internship_type: value,
          name: name,
          mobileNumber: mobile,
          emailid: email,
        })

        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
        console.log(error);
        setInternError(false);
      }
    } else {
      setInternError(true);
    }
  };

  return (
    <>
      <div className="log-sign-body">
        <Container style={{ width: "400px" }}>
          <Row>
            <Col>


              <img className="login-logo" src={require("./logo.jpeg")} alt="logo" />

              <div className="p-4 box">


                {/* {users.map((user)=>{
          return <div>{user.intern_id}</div>
        })} */}



                <h2 className="mb-3">Signup</h2>

                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                {InternError ? <Alert variant="danger">Enter Valid Intern Id</Alert> : error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>


                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="Enter Your Intern Id"
                      required
                      onChange={(e) => setIntern(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">

                    <select className="sign-select" required value={value} onChange={handleChange} >
                      <option value="">Select Internship</option>
                      <option value="Web Development">Web Development</option>
                      <option value="HR">HR</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      pattern="[0-9]{10}"
                      placeholder="Enter Your Mobile Number"
                      required
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 ">
                    <Button className="log-sign-btn" variant="primary" type="Submit">
                      Sign up
                    </Button>
                  </div>
                </Form>
              </div>
              <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/">Log In</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Signup;