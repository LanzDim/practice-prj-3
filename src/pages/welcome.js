import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

export default function Welcome() {
  const [credentials] = useContext(CredentialsContext);

  return (
    <div>
      <h1>
        WELCOME! {credentials && credentials.username}
        {!credentials && <Link to="/register">Register</Link>}
        <br />
        {!credentials && <Link to="/login">Login</Link>}
        {credentials && <Todos />}
      </h1>

    </div>
  );
}
