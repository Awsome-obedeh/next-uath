"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// next-auth does nt allow direcr post request
import {signIn} from 'next-auth/react'
// import {signIn} from 'next-auth/client'(next-auth v3)
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
      // we have to specify the kind of providers we use, cause we can use more than provider in our app
        // the signIn function will always resolve, wont return an error
      const result =signIn('credentials',{
        email:email,
        password:password,
        redirect:false
        // we use the redirect false to prevent next-auth from redirecting us to an error page


      })
      if(result.error){
        setErrorMsg(result.error);
        return
      }
      // if our the login is successful direct us to our dashboard page 
      router.push('/dasboard')

    }
    
    catch(error){
    console.log(error)
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
