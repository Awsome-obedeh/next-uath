"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
  // use next router
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  // a submit hanlder function to handle our form submission
  async function submitHandler(e) {
    try {
      e.preventDefault();

      if (!email || !password) {
        setErrorMsg("please provide login details");
        return;
      }

      // send to an endpoint
      const login = await axios.post(
        "api/login/",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (login.status === 200) {
        router.replace("/");
      }
      else{
        setErrorMsg('invalid credentials')
      }
    } catch (error) {
      console.error(`error ${error}`);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      action=""
      className="card card-body w-50 mt-5 mx-auto"
    >
      <div className="display-4 mb-4">Login here</div>
      <div className="form-input">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="name"
          // bind the input to the useState(email) value
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-input">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-outline-secondary w-25 mx-auto mt-3">Login</button>

      {
        errorMsg && <div className="alert alert-danger">{errorMsg} </div>
      }
      <Link href="/register">Register here</Link>
    </form>
  );
}
