import { FsContext } from "@/comps/cont/fsCont";
import { awsAPI } from "@/utils/api";
import { useContext, useEffect, useState } from "react";

export const Followers = () => {
    const fsCont = useContext(FsContext); 
    const [users , setUsers] = useState<any | null>(null); 

    useEffect(() => {
       awsAPI.get(`user/followers/${fsCont?.usr?.id?.S}`).then((res) => {
          setUsers(res?.data); 
       })
    }, [fsCont]); 

    return (
        <div className="flex flex-col justify-center items-center w-full">
            List of follower users.
            <div>
                {users != null && users?.length != 0 ? users?.map((x: any , i: number) => {
                    return <div key={i} className='flex flex-col justify-center items-center cursor-pointer' onClick={() => window.location.href = `/followers/${x?.pool_name?.S}`}>
                        User Name: {x?.userName?.S}
                       <img src={x?.pic?.S} className="w-16 h-16 rounded-full"/>
                    </div>
                }) : <div>No followers</div>}
            </div>
        </div>
    )
};

export default Followers; 