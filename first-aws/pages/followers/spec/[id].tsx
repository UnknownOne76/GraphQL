import { useContext, useEffect, useState } from "react";
import { awsAPI } from '@/utils/api';
import { useRouter } from 'next/router';
import { FsContext } from "@/comps/cont/fsCont";

export const SpecFollowers = () => {
    
    const router = useRouter();
    const fsCont = useContext(FsContext); 
    const [data , setData] = useState<any | null>(null); 
    const { id } = router?.query;

    useEffect(() => {
        awsAPI.get(`user/followers/${id}`).then((res) => {
            setData(res?.data);  
         }) 
     }, [fsCont]); 

    return (
        <div>
            {data != null && data?.length != 0 ? data?.map((x: any, i: number) => {
                return <div className="flex flex-col justify-center items-center w-full cursor-pointer" key={i} onClick={() => window.location.href = `/followers/${x?.pool_name?.S}`}>
                    UserName: {x?.userName?.S}
                    <img src={x?.pic?.S} className="flex w-24 h-24 rounded-full"/>
                </div>
            }): <div>Waiting.</div>}
        </div>
    )
}; 

export default SpecFollowers;