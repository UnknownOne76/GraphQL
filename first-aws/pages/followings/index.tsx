import { FsContext } from "@/comps/cont/fsCont";
import { awsAPI } from "@/utils/api";
import { useContext, useEffect, useState } from "react";

export const Followings = () => {
    const fsCont = useContext(FsContext); 
    const [users , setUsers] = useState<any | null>(null); 
    useEffect(() => {
         if(fsCont?.usr?.id?.S != undefined) {
             awsAPI.get(`user/following/${fsCont?.usr?.id?.S}`).then((res) => {
                setUsers(res?.data);  
             })
         }
    }, [fsCont]);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            List of following users.
            <div>
                {users != null ? users.map((x: any, i: number) => {
                   return <div key={i} className="flex flex-col justify-center items-center cursor-pointer" onClick={() => window.location.href = `/followings/${x?.pool_name?.S}`}>
                       User Name: {x?.userName?.S}
                       <img src={x?.pic?.S} className="w-16 h-16 rounded-full"/>
                   </div>
                }): 'awaiting'}
            </div>
        </div>
    )
}; 

export default Followings; 