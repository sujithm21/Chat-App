import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("In validation", registerRoute);
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 4) {
      toast.error("Username should be atleast 4 characters.", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error("Password should be atleast 7 characters.", toastOptions);
      return false;
    } else if (email.length === 0) {
      toast.error("Email cannot be empty.", toastOptions);
      return false;
    }
  };

  const handleChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit">Create user</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
      background-color: white;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      border-radius: 0.2rem;
      border: 0.1rem solid #4e0eff;
      padding: 1rem;
      color: white;
      width: 100%;
      font-size: 0.7rem;
      &:focus {
        border: 0.1rem solid #997afo;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e04ff;
        text-decoration: none;

        font-weight: bold;
      }
    }
  }
`;

export default Register;
