import React from "react";
import { sortNameCapital } from "../../utils/helper";
const ProfileInfo = ({ logout, userInfo }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center text-2xl text-black">
          {sortNameCapital(userInfo?.name)}
        </div>
        <div>{userInfo?.name} </div>
        <button
          className="bg-red-600 p-1 rounded-md hover:opacity-80 text-white text-sm "
          onClick={logout}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default ProfileInfo;
