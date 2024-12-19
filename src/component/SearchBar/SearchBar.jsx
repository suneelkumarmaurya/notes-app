import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-40 sm:60 md:w-80">
      <input
        type="text"
        placeholder="Search"
        value={value}
        className="w-full px-2 py-[9px] bg-transparent outline-none bg-slate-200 rounded-lg text-sm "
        onChange={onChange}
      />
      {value && (
        <IoIosClose
          className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-slate-500  hover:text-slate-900"
          onClick={onClearSearch}
        />
      )}
      <FaSearch
        className="absolute right-2  top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-500  hover:text-slate-900"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
