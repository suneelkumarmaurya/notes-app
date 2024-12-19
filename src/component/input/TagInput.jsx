import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleRemoveTag = (removeToTag) => {
    setTags(tags.filter((tag) => tag !== removeToTag));
  };
  const addNewTags = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTags();
    }
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <IoIosClose size={25} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center  gap-2">
        <input
          type="text"
          className="text-sm bg-transparent outline-none px-4 py-1 rounded border"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 border border-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center rounded"
          onClick={addNewTags}
        >
          <IoIosAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
