import React, { useState } from "react";
import Password from "../../component/input/password";
import { Link, useNavigate } from "react-router-dom";
import {validateEmail} from "../../utils/helper";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInStart, signInFailure ,signInSuccess} from "../../redux/user/userSlice";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
  });
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit =async (e) => {
    e.preventDefault();
    // validate name error
    if(!name){
      setError((prev) => ({ ...prev, name: "Name is required" }));
      return
    }
    setError((prev) => ({ ...prev, name: "" }));

    // validate email empty error
    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    // validate email format error
    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }
    setError((prev) => ({ ...prev, email: "" }));
    // validate password empty error
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    setError((prev) => ({ ...prev, password: "" }));

    // Sign Up Api
    try{
      dispatch(signInStart());
      const {data}= await axios.post(`${backend_url}/api/user/sign-up`,{name , email ,password},{withcrediential:true})
      if(data.success==true){
        navigate("/login");
        dispatch(signInFailure(data.message));
      }else {
        navigate("/sign-up");
        dispatch(signInFailure(data.message));
      }
    } catch(error){
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex flex-col bg-white px-5 py-10 w-96 border border-slate-400 rounded">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl  mb-7">Sign Up</h4>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-box"
          />
          {
            error.name && <span className="text-red-600">{error.name}</span>
          }
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
          />
          {error.email && <span className="text-red-600">{error.email}</span>}
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <span className="text-red-600">{error.password}</span>}
          <button className="btn-primary">Sign Up</button>
        </form>

        <p>
          Already have an account?
          <Link to={"/Login"}>
            <span className="text-[#2B85FF]">Login</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
