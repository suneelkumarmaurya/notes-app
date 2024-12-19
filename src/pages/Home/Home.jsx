import React, { useEffect, useState } from "react";
import NoteCard from "../../component/Cards/NoteCard";
import { IoMdAdd } from "react-icons/io";
import AddEditNotes from "./AddEditNotes";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Home = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [userInfo, setUserInfo] = useState(null);
  const [allNote, setAllNote] = useState([]);
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState({
    show: false,
    type: "create",
    data: null,
  });

  useEffect(() => {
    if (currentUser === false) {
      navigate("/login");
    } else {
      setUserInfo(currentUser);
      getAllData();
    }
  }, [userInfo]);
  // fetch content data from database
  const getAllData = async () => {
    try {
      const res = await axios.get(`${url}/api/user/all-note`, {
        withCredentials: true,
      });
      setAllNote(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const isPinnedNote = async (noteId, isPinned) => {
    try {
      if (isPinned == true) {
        isPinned = false;
      } else {
        isPinned = true;
      }
      const { data } = await axios.post(
        `${url}/api/user/note-pinned/${noteId}`,
        { isPinned },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteNote=async(noteId)=>{
    try {
      const {data} = await axios.post(`${url}/api/user/delete-note/${noteId}`,{},{withCredentials: true,})
      toast.success(data.message)
      getAllData();
    } catch (error) {
      console.log(error.message)
    }
  }

  // get individual data of note for update 

  const getNoteData=async(noteId)=>{
      try {
          const {data}=await axios.post(`${url}/api/user/individual-note-data/${noteId}`,{noteId},{withCredentials: true})
          console.log(data.data )
          setShowModal({
            ...showModal,
            show: true,
            type: "edit",
            data: data.data,
          });
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
  }
  return (
    <>
      <div className="m-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  ">
          {allNote.map((note, index) => {
            return (
              <NoteCard
                key={index}
                title={note.title}
                Date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                isPinNote={() => {
                  isPinnedNote(note._id, note.isPinned);
                }}
                handleEdit={() => {getNoteData(note._id)}}
                handleDelete={() => {
                  deleteNote(note._id);
                }}
              />
            );
          })}
        </div>
      </div>
      <button
        className="h-16 w-16 bg-[#2B85FF] rounded-2xl fixed bottom-6 right-6 flex items-center justify-center"
        onClick={() => {
          setShowModal({
            ...showModal,
            show: true,
            type: "create",
            data: null,
          });
        }}
      >
        <IoMdAdd size={35} className="text-white" />
      </button>

      {showModal.show && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-md:w-[60%] max-sm:w-[80%] max-h-[80%] overflow-y-auto no_scrollbar ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold capitalize ">
                {showModal.type}
              </h2>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={() => setShowModal({ ...showModal, show: false })}
              >
                <IoIosClose size={25} />
              </button>
            </div>
            <AddEditNotes type={showModal.type} noteData={showModal.data} showModal={showModal} setShowModal={setShowModal} getAllData={getAllData}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
