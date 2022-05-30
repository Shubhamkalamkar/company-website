import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { async } from "@firebase/util";

import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();

  // firestore
  const [interns, setInterns] = useState([]);
  const internsCollectionRef = collection(db, "validate-intern-id")

  useEffect(()=>{

    const getInterns = async()=>{
      const internsData = await getDocs(internsCollectionRef);
      console.log(internsData)

      setInterns(internsData.docs.map((doc) => ({...doc.data(), id:doc.id })))
    };

    getInterns();
  }, [])

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/company-website/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div className="log-sign-body">
    <Container style={{ width: "400px" }}>
    <Row>
        <Col>
      <div className="p-4 box">
        <h2 className="mb-3">Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Your Intern Id"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Your Mobile Number"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
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
        Already have an account? <Link to="/company-website/">Log In</Link>
      </div>
      </Col>
      </Row>
      </Container>
      </div>
    </>
  );
};

export default Signup;