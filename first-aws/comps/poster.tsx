import React, { useEffect, useState } from "react"
import { FaEllipsisH } from "react-icons/fa";
import { FiHeart , FiMessageCircle , FiSend } from "react-icons/fi"
import { CiBookmark } from "react-icons/ci";
import moment from 'moment';
import { awsAPI } from "@/utils/api";

const Poster = (props: any) => {
    const { author , poster , likes , cmts , when , topic, id} = props; 
    const [txt , setTxt] = useState<string>(''); 
    const [cmt , setCmt] = useState<any>(); 

    useEffect(() => {
       awsAPI.get(`/cmt/get/${id}`).then((res) => {
          setCmt(res?.data); 
       })
    }, [cmt]);

    const giveLike = async() => {
        await awsAPI.post('posts/like', {
           userId: author?.id?.S, 
           postId: id
        }).then((res) => {
           console.log(res);
        })
    };
   
   const addCmt = async() => {
      if(txt == '') return false;
      await awsAPI.post(`cmt/add` , {
         userName: author?.userName?.S,
         comment: txt, 
         postId: id
      });
   }
    
    return (
       <div className="flex flex-col w-100 justify-start mt-5">
         <div className="flex flex-row justify-start items-center m-2 w-full"><div className="flex w-4/5 items-center"><img src={author?.pic?.S} className="rounded-full w-8 h-8 mr-2"/><div className="text-[#262626] font-bold">{author?.userName?.S}</div></div><div className="w-1/12 ml-[3.5vw]"><FaEllipsisH size={18}/></div></div>
         <div className="flex flex-col justify-center items-center"><img src={poster} className="w-[614px] h-[614px] rounded-lg"/></div>
         <div className="flex justify-start m-4"><FiHeart size={24} className="mr-2" onClick={() => giveLike()}/><FiMessageCircle size={24} className="mr-2"/><FiSend size={24} className="mr-2"/><CiBookmark size={24} className="ml-[30vw]"/></div>
         <div className="flex flex-col justify-start m-4">
            <div className="text-sm font-bold">{likes} likes</div>
            <div className="flex justify-start items-center"><div className="text-sm font-bold">{author?.userName?.S}</div><div className="ml-4 text-sm">{topic}</div></div>
            <div>View all {cmts} comments</div>
            <div className="uppercase">{moment(when).format('lll')}</div>
         </div>
         <div className="flex justify-start m-4 border-t-2 border-[#8E8E8E]">
            <div className="flex m-4"><input placeholder="Add a comment..." className="text-sm font-bold outline-none w-[36vw]" type={"text"} onChange={(e) => setTxt(e?.target?.value)}/><div className="text-[#0095F6] cursor-pointer" onClick={() => addCmt()}>Post</div></div>
        </div>
        <div>
          Comments: {cmt != null ? cmt.map((x: any, i: number) => {
              return <div className="flex flex-col"> 
                 <div>UserName: {x?.userName?.S}</div>
                 <div>Said: {x?.txt?.S}</div>
              </div>
          }): <div>Loading...</div>}
        </div>
       </div>
    )
}; 

export default Poster; 
