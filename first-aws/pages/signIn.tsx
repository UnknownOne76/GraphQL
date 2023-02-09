import { useState } from "react";
import {
	CognitoUserPool,
	CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

let poolData = {
	UserPoolId: 'ap-northeast-2_RtKVTek59',
	ClientId: '68km7r76940llp24pmtdsfq12q',
};

const userPool = new CognitoUserPool(poolData); 

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
                    onSuccess: result => {res(result), console.log(result)},
                    onFailure: err => rej(`Rejected: ${err}`),
                    })
            })
          }; 
        } catch(err) {
            console.log(err); 
         }
        }

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
        </div>
    )
}; 

export default SignIn;