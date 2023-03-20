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
            UserName: {dt?.userName?.S}
        </div>
    )
}; 

export default NavUser;