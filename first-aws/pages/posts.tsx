import { FsContext } from "@/comps/cont/fsCont";
import Poster from "@/comps/poster";
import { awsAPI } from "@/utils/api";
import { useContext, useEffect, useState } from "react";

export const Post = () => {
    const fsCont = useContext(FsContext); 
    const [data , setData] = useState<any>(); 
    
    useEffect(() => {
       awsAPI.get(`posts/${fsCont?.usr?.id?.S}`).then((res) => {
          setData(res?.data); 
       })
    }, [fsCont]); 
    return (
        <div className="flex flex-col w-full justify-center items-center">
            {data != null ? data?.map((x: any, i: number) => {
                return <Poster author={x?.userData?.M} poster={x?.url?.S} likes={x?.likes?.N} cmts={x?.comments?.N} when={x?.date?.S} topic={x?.content?.S} id={x?.postId?.S} key={i}/>
            }): <div>Awaiting.</div>}
        </div>
    )
};

export default Post;