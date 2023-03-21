import { FsContext } from "@/comps/cont/fsCont";
import Poster from "@/comps/poster";
import { awsAPI } from "@/utils/api";
import { useContext, useEffect } from "react";

export const Post = () => {
    const fsCont = useContext(FsContext); 
    
    useEffect(() => {
       awsAPI.get(`posts/${fsCont?.usr?.id?.S}`).then((res) => {
        console.log(res); 
       })
    }, [fsCont]); 
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <Poster author={fsCont?.usr}/>
        </div>
    )
};

export default Post;