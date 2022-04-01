import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
const SignUp = ({ setErr }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(
        "http://localhost:5000/api/signUp",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      const data = await response.json();

      if (data.status === "ok") {
        history.push("/login");
      } else if (data.error) {
        setErr("email has alredy benn used");
      }
    } catch (e) {
      setErr("network error please check your network");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form justify-content-center ">
        <form onSubmit={registerUser} className="access">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={name}
              required="true"
              onChange={(e) => setName(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              {/* {"username taken"} */}
            </div>
          </div>
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
              {/* {"email taken  please login if its yours"} */}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" class="btn custom">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
