import { useEffect, useState } from "react";
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { cognitoClient, userPool } from "@/utils/aws";
import { awsAPI } from "@/utils/api"; 
import { v4 as uuidv4} from "uuid";

const SignUp = () => {
    
    const uid = uuidv4().slice(0, 5); 
    const [name , setName] = useState<string>(''); 
    const [err , setErr] = useState<any | null>(null); 
    const [email , setEmail] = useState<string>(''); 
    const [pwd , setPwd] = useState<string>('');
    const [img , setImg] = useState<string>('');  

    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email })
      ];

      useEffect(() => {
          console.log(err?.message);  
      }, [err]); 
    
    const signUp = async () => {
        try {
            return await new Promise((res, rej) => {
                if(name != '' && pwd != '' && img != '') {
                        userPool.signUp(name, pwd, attributeList, null as any , async(err , data) => {
                            const confirmParams = {
                                  UserPoolId: process.env.POOL_ID,
                                  Username: name,
                            };
                            await cognitoClient.adminConfirmSignUp(confirmParams);
                            if(err) {
                               rej(err); 
                               console.log(err); 
                            }
                            else {
                               setErr(null); 
                               console.log(data);     
                               awsAPI.post(`/user/create/${uid}`, {
                                   userName: name, 
                                   pl_name: name.toLocaleLowerCase().trim(), 
                                   pwd: pwd,
                                   prof: img
                               })
                               alert('Signed up successfully!');
                               window.location.href = '/signIn';  
                               res(data); 
                            }
                       }); 
                }
                else {
                   name == '' ? alert('name required') : pwd == '' ? alert('password required') : img == '' ? alert('Source required!') : ''
                }
            }); 
        } catch(err) {
            console.log(err); 
            setErr(err); 
        }
    }; 

    const handleImageChange = (e: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader?.result as any);
        };
        reader.readAsDataURL(e.target.files[0]);
      };

    return (
        <div className="flex flex-col w-full justify-center items-center">
           <div>AWS COGNITO USER SIGN UP</div>
           <div>
              <div>UserName</div>
              <input type={"text"} value={name} onChange={(e) => setName(e.target?.value)} className="bg-black text-green-500"/>
              <div>Password</div>
              <input type={"password"} value={pwd} onChange={(e) => setPwd(e.target?.value)} className="bg-black text-green-500"/>
              <div className="flex text-red-500">{err != null ? err?.message.slice(38) : err}</div>
              <div>Email</div>
              <input type={"email"} value={email} onChange={(e) => setEmail(e.target?.value)} className="bg-black text-green-500"/>
              <div>Add your Profile Picture here!</div>
              <input type={"file"} accept="image/png , image/jpeg" onChange={handleImageChange}/>
              <div>Image: </div>
              <img src={img} style={{width: 150 , height: 100}}/>
           </div>
           <button onClick={() => signUp()}>Sign Up!</button>
        </div>
    )
}; 

export default SignUp; 