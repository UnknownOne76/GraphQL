import { useState } from "react";
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

var poolData = {
	UserPoolId: 'ap-northeast-2_RtKVTek59',
	ClientId: '68km7r76940llp24pmtdsfq12q',
};
var userPool = new CognitoUserPool(poolData);

const SignUp = () => {

    const [name , setName] = useState<string>(''); 
    const [email , setEmail] = useState<string>(''); 
    const [pwd , setPwd] = useState<string>('');

    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email })
      ];
    
    const signUp = async () => {
        try {
            return await new Promise((res, rej) => {
                if(name != '' && pwd != '') {
                        userPool.signUp(name, pwd, attributeList, null as any , (err , data) => {
                            if(err) {
                               rej(err); 
                               console.log(err); 
                            }
                            else{
                               console.log(`Sth worked! DATA: ${data}`);
                               res(data); 
                            }
                       }); 
                }
            }); 
        } catch(err) {
            console.log(err);
        }
    }; 

    return (
        <div className="flex flex-col w-full justify-center items-center">
           <div>AWS COGNITO USER SIGN UP</div>
           <div>
              <div>UserName</div>
              <input type={"text"} value={name} onChange={(e) => setName(e.target?.value)} className="bg-black text-green-500"/>
              <div>Password</div>
              <input type={"password"} value={pwd} onChange={(e) => setPwd(e.target?.value)} className="bg-black text-green-500"/>
              <div>Email</div>
              <input type={"email"} value={email} onChange={(e) => setEmail(e.target?.value)} className="bg-black text-green-500"/>
           </div>
           <button onClick={() => signUp()}>Sign Up!</button>
        </div>
    )
}; 

export default SignUp; 