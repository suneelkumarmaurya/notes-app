import React, { useEffect, useState } from "react";
import TagInput from "../../component/input/TagInput";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInStart, signInFailure ,signInSuccess} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddEditNotes = ({type ,noteData ,showModal,setShowModal ,getAllData}) => {
    const [title ,setTitle] =useState("")
    const [content ,setContent]=useState("")
    const [tags , setTags] =useState([])
    const [error , setError]=useState({
        title:"",
        content:""
    })

    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNoteEdit=async()=>{
      try {
          const {data}= await axios.post(`${backend_url}/api/user/edit-note/${noteData._id}`,{title,content,tags},{withCredentials: true,})
          if(data.success){
            toast.success(data.message)
           setShowModal({...showModal,show:false})
          }
      } catch (error) {
         console.log(error.message)
      }
    }

    const handleNoteAdd =async()=>{
      try{
        const {data}= await axios.post(`${backend_url}/api/user/add-note`,{title , content,tags},{withCredentials:true})
        if(data.success){
          toast.success(data.message)
         setShowModal({...showModal,show:false})
         getAllData()
        }
      } catch(error){
        console.log(error)


      }
    }
    const handleAddNote =()=>{
        if(!title){
            setError((prev)=>({...prev ,title:"Please enter title"}))
            return
        }
        setError((prev)=>({...prev ,title:""}))

        if(!content){
            setError((prev)=>({...prev ,content:"Please enter content"}))
            return
        }
        setError((prev)=>({...prev , content:""}))

        if(type==="edit"){
            handleNoteEdit()
        } else {
            handleNoteAdd()
        }
    }

    useEffect(() => {
      if (type === "edit" && noteData) {
        setTitle(noteData.title || "");
        setContent(noteData.content || "");
        setTags(noteData.tags || []);
      }
    }, [type, noteData]);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="input-label text-red-500 uppercase">Title</label>
        <input
          type="text"
          placeholder="Wake up at 6 a.m."
          className="input-box"
          value={title }
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      {
        error?.title && (<p className="text-sm text-red-500">{error?.title}</p>)
      }
      
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="input-label text-red-500 uppercase">Content</label>
        <textarea
          cols="30"
          rows="10"
          placeholder="please enter content"
          className="input-box"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        ></textarea>
      </div>
      {
        error?.content && (<p className="text-sm text-red-500">{error?.content}</p>)
      }
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="input-label text-red-500 uppercase">
          tags
        </label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      <button className="bg-[#2B85FF] font-medium mt-5 p-3" 
      onClick={handleAddNote}>{type === "edit"?"Update":"ADD"}</button>

    </div>
  );
};

export default AddEditNotes;
