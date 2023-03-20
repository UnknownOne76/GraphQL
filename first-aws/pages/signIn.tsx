import { useContext, useEffect, useState } from "react";
import {CognitoUser,AuthenticationDetails} from 'amazon-cognito-identity-js';
import { userPool } from "@/utils/aws";
import { FsContext } from "@/comps/cont/fsCont";

const SignIn = () => {
    const [name , setName] = useState<string>(''); 
    const [pwd, setPwd] = useState<string>(''); 
    const userData = {Username: name, Password: pwd} , details = new AuthenticationDetails(userData); 
    const cogUser = new CognitoUser({
        Username: name, 
        Pool: userPool,
    }); 

    const authIt = async () => {
        try {
            if(name != '' && pwd != '') { 
            await new Promise((res , rej) => {
                cogUser.authenticateUser(details, {
                    onSuccess: result => {res(result), console.log(result), window.localStorage.setItem('name' , name), setTimeout(() => {return window.location.href = '/'}, 1000)},
                    onFailure: err => rej(`Rejected: ${err}`),
                });
            })
          }; 
        } catch(err) {
            console.log(err); 
         }
        };

    return (
        <div className="flex flex-col w-full justify-center items-center">
           <div>AWS COGNITO USER SIGN IN</div>
           <div>
              <div>UserName</div>
              <input type={"text"} value={name} onChange={(e) => setName(e.target?.value)} className="bg-black text-green-500"/>
              <div>Password</div>
              <input type={"password"} value={pwd} onChange={(e) => setPwd(e.target?.value)} className="bg-black text-green-500"/>
           </div>
           <button onClick={() => authIt()}>Sign In!</button>
           <div onClick={() => window.location.href = '/signUp'} className="cursor-pointer">New One? {'->'} Sign Up.</div>
        </div>
    )
}; 

export default SignIn;