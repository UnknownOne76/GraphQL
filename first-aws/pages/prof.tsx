import { FsContext } from "@/comps/cont/fsCont";
import { awsAPI } from "@/utils/api";
import { cognitoClient } from "@/utils/aws";
import { useContext, useEffect } from "react";

export const userProf = () => {
    const fsCont = useContext(FsContext);
    useEffect(() => {
        fsCont?.onStateChanged(); 
        console.log(fsCont?.usr);  
      }, [fsCont]) 

      const deleteAcc = async () => {
        try {
            const params = {
                UserPoolId: process.env.POOL_ID,
                Username: fsCont?.usr?.userName?.S,
              };
            await cognitoClient.adminDeleteUser(params).then(async(res) => {
                console.log(`Deleted user!: ${res}`); 
                await awsAPI.delete(`user/delete/${fsCont?.usr?.id?.S}`).then(() => {
                   console.log(`User deleted!: userID: ${fsCont?.usr?.id?.S}`); 
                   fsCont?.signOut(); 
                });     
            });
        }
        catch(err) {
            console.log(err); 
        }; 
      };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            User Profile
            <div>ID: {fsCont?.usr?.id?.S}</div>
            <div>Name: {fsCont?.usr?.userName?.S}</div>
            <div className="flex justify-center items-center">
            <div className="mr-5">Posts: {fsCont?.usr?.posts?.N}</div>
            <div className="mr-5">Followers: {fsCont?.usr?.followers?.N}</div>
            <div>Following: {fsCont?.usr?.following?.N}</div>
            </div>
            <button onClick={() => deleteAcc()}>Delete account</button>
            <button onClick={() => fsCont?.signOut()}>Sign out</button>
        </div>
    )
}; 

export default userProf;