import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
const Login = ({ setErr }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/login",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (!data) {
      setLoading(true);
    }

    if (data.user) {
      localStorage.setItem("token", data.user);
      history.push("/Dashboard");
    } else {
      setErr("login failed check username or password");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="form justify-content-center ">
        <form onSubmit={loginUser} className="access">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              required="true"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              value={password}
              required="true"
              autoComplete={false}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading && "loading"}
          </div>
          <button type="submit" class="btn custom">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
