import { awsAPI } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const NavUser = () => {
    const router = useRouter();
    const { id } = router?.query;
    const [dt , setDt] = useState<any | null>(null)
    
    useEffect(() => {
        if(id != undefined || id != null) {
            awsAPI.get(`/user/get/${id}`).then((res) => {
                setDt(res?.data?.data); 
            })
        } 
    }, [id]); 
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div>UserName: {dt?.userName?.S} </div>
            <img src={dt?.pic?.S} className='w-24 h-24 rounded-full'/>
            <div>Posts: {dt?.posts?.N}</div>
            <div className='flex justify-center items-center'>
            <div className='m-2'>Following: {dt?.following?.N}</div>
            <div>Followers: {dt?.followers?.N}</div>
            </div>
        </div>
    )
}; 

export default NavUser;