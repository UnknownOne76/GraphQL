import API from "@/utils/api";
import React, { useEffect, useState } from "react"

const Post = () => {
    const [txt , setTxt] = useState<string>(''); 
    const [img , setImg] = useState<any | null>(null); 
    let images: any = []; 

    const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const fileChanges = async(e: any) => { 
        setImg(Array.from(e?.target?.files)); 
    }; 
  

    const sendIt = async() => {
        img.map(async(x: any , i: number) => {
           let newX = await toBase64(x); 
           images.push(newX);   
        }); 
        
        if ( images.length != 0 && txt != '') {
            await API.put('add', {
                images: images,
                topic: txt
            }); 
        }; 
    }; 

    return (
        <div className="flex flex-col w-full justify-center items-center">
           Add your images!
           <input type="file" multiple accept="image/png , image/jpeg , image/webp" onChange={fileChanges}/>
           <input type="text" placeholder="Add your topic here." onChange={(e) => setTxt(e.target.value)}/>
           <button onClick={sendIt}>Send</button>
        </div>
    )
};

export default Post;