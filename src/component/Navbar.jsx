import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,

} from "../redux/user/userSlice";
import axios from "axios";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BACKEND_URL;
  const onChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = () => {
    console.log("search");
  };

  const logout = async () => {
    try {
      dispatch(signOutStart());
      const { data } = await axios.post(`${url}/api/user/logout`, {
        withCredentials: true,
      });
      if (data.error === true) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/login");
      console.log("logout", data);
    } catch (error) {
      console.log(error.message);
      dispatch(signOutFailure(error.message));
    }
  };

  const [userInfo, setUserInfo] = useState(null);
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
      setUserInfo("")
    } else {
      setUserInfo(currentUser);
    }
  }, [currentUser]);
 
  return (
    <div className="bg-white flex items-center justify-between px-6 py-4 shadow-md">
      <h2 className="text-xl font-medium text-black py-2">
        <span className="text-slate-500">Good</span>
        <span className="text-slate-900">Notes</span>
      </h2>
      <SearchBar
        onChange={onChange}
        onClearSearch={onClearSearch}
        value={searchQuery}
        handleSearch={handleSearch}
      />
      <ProfileInfo logout={logout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
