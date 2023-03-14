import React, { useState } from "react"
import { FaEllipsisH } from "react-icons/fa";
import { FiHeart , FiMessageCircle , FiSend } from "react-icons/fi"
import { CiBookmark } from "react-icons/ci";
import moment from 'moment';

const Poster = ({props}: any) => {
    const {author , pic } = props;  
    
    return (
       <div className="flex flex-col w-100 justify-start mt-5">
         <div className="flex flex-row justify-start items-center m-2 w-full"><div className="flex w-4/5 items-center"><img src={author?.photo} className="rounded-full w-8 h-8 mr-2"/><div className="text-[#262626] font-bold">{author?.name}</div></div><div className="w-1/12 ml-[3.5vw]"><FaEllipsisH size={18}/></div></div>
         <div className="flex flex-col justify-center items-center"><img src={''} className="w-[614px] h-[614px] rounded-lg"/></div>
         <div className="flex justify-start m-4"><FiHeart size={24} className="mr-2"/><FiMessageCircle size={24} className="mr-2"/><FiSend size={24} className="mr-2"/><CiBookmark size={24} className="ml-[30vw]"/></div>
         <div className="flex flex-col justify-start m-4">
            <div className="text-sm font-bold">1.069 likes</div>
            <div className="flex justify-start items-center"><div className="text-sm font-bold">Terry</div><div className="ml-4 text-sm">Topic</div></div>
            <div>View all 100 comments</div>
            <div className="uppercase">1 seconds ago</div>
         </div>
         <div className="flex justify-start m-4 border-t-2 border-[#8E8E8E]">
            <div className="flex m-4"><input placeholder="Add a comment..." className="text-sm font-bold outline-none w-[36vw]" type={"text"}/><div className="text-[#0095F6]">Post</div></div>
        </div>
       </div>
    )
}; 

export default Poster; 
