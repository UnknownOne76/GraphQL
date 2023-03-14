import Link from "next/link";
import React, { useContext } from "react";
import { FiHome , FiPlusSquare , FiHeart } from "react-icons/fi";
import { FsContext } from "../cont/fsCont";

const Header = () => {  
    const fsCont = useContext(FsContext);   
    return (
        <div className="flex justify-center items-center w-100vw mt-5">
           <div className="mr-96"><img src="/insta.png" width={100} height={100}/></div>
           <div className="flex flex-row justify-center items-center w-[215px] bg-[#FAFAFA] border-2 border-gray-500 mr-32 rounded-lg p-0.5"><img src="/search.png" width={12} height={12} className="mr-2"/><input placeholder="Search" className="text-sm text-[#8E8E8E] outline-none"/></div>
           <div className="flex flex-row justify-center items-center"> 
           <div className="ml-5"><FiHome size={24}/></div>
           <div className="ml-5" onClick={() => window.location.href = '/post'}><FiPlusSquare size={24}/></div>
           <div className="ml-5"><FiHeart size={24}/></div>
           <Link href={"/prof"}><img src={fsCont?.usr?.pic?.S != '' ? fsCont?.usr?.pic?.S : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/800px-Anonymous_emblem.svg.png'} className="rounded-full w-6 h-6 ml-5"/></Link>
           </div>
        </div>
    )
}; 

export default Header; 