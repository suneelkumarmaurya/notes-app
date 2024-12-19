import React, { useState } from "react";
import { VscPinned } from "react-icons/vsc";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment"
const NoteCard = ({
  title,
  Date,
  content,
  tags,
  isPinned,
  isPinNote,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white p-6  m-1 rounded-lg hover:shadow-lg transition-all  ease-in-out">
      <div className="flex  items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-green-700">{moment(Date).format("Do MMM ,yyyy")}</span>
        </div>

        <VscPinned
          size={22}
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF]" : "text-slate-400"
          } hover:text-[#2B85FF]}`}
          onClick={isPinNote}
        />
      </div>
          
      <p className="mt-5 text-sm">{content && content.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-5 ">
        <div className="text-xs text-slate-400">
          {tags.map((tag,index)=>{
            return (" #"+tag)
          })}
        </div>
        <div className="flex items-center gap-3  ">
          <MdEdit
            size={22}
            onClick={handleEdit}
            className="text-slate-400 cursor-pointer hover:text-[#2B85FF]"
          />
          <MdDelete
            size={22}
            onClick={handleDelete}
            className="text-red-400 cursor-pointer hover:text-red-600 "
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
