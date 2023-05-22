import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const message = await response.json();
    console.log("message", message);
    throw Error(message);
  }
  return response;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [setCredentials] = useContext(CredentialsContext);

  
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
            username,
            password,
        });
        navigate("/"); 
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Log in here!</h1>
      {error && <span>Error has occurred</span>}
      <form onSubmit={Login}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
