import React, { useState , useContext } from "react"

const Post = () => {
    const [txt , setTxt] = useState<string>(''); 
    const [img , setImg] = useState<any | null>(null); 

    return (
        <div className="flex flex-col w-full justify-center items-center">
           Add your images!
        </div>
    )
};

export default Post;