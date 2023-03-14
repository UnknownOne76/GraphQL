import { FsContext } from "@/comps/cont/fsCont";
import { awsAPI } from "@/utils/api";
import React, { useState , useContext } from "react"
import { v4 as uuidv4 } from 'uuid';

const Post = () => {
    const fsCont = useContext(FsContext); 
    const [title , setTitle] = useState<string>(''); 
    const [txt , setTxt] = useState<string>(''); 
    const [img , setImg] = useState<any | null>(null); 
    const postId = uuidv4().slice(0, 4);

    const handleImageChange = (e: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader?.result as any);
        };
        reader.readAsDataURL(e.target.files[0]);
      };

    const postIt = async() => {
        if(title != '' && txt != '' && img != null) {
            await awsAPI.post('/post/create', {
                 postId: postId,
                 userId: fsCont?.usr?.id?.S,
                 title: title,
                 content: txt, 
                 img: img
            }); 
        }; 
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
           <div>Title of post</div>
           <input placeholder="Title of post" onChange={(e) => setTitle(e.target.value)} value={title}/>
           <div>Content</div>
           <input placeholder="Content here" onChange={(e) => setTxt(e.target.value)} value={txt}/>
           <div>Photo of your post</div>
           <input type={"file"} accept="image/png , image/jpeg" onChange={handleImageChange}/>
           <div>Preview: <img src={img} style={{width: 150 , height: 100}}/></div>
           <button onClick={() => postIt()}>Post</button>
        </div>
    )
};

export default Post;