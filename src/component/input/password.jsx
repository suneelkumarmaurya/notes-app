import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const password = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="flex justify-between items-center  w-full border input-box">
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent outline-none px-2"
        value={value}
        onChange={onChange}
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    </div>
  );
};
export default password;
