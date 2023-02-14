import { useEffect, useState } from "react";
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { userPool } from "@/utils/aws";

const SignUp = () => {

    const [name , setName] = useState<string>(''); 
    const [email , setEmail] = useState<string>(''); 
    const [pwd , setPwd] = useState<string>('');
    const [img , setImg] = useState<string>('');  

    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email })
      ];

      useEffect(() => {
          console.log(img); 
      }, [img]); 
    
    const signUp = async () => {
        try {
            return await new Promise((res, rej) => {
                if(name != '' && pwd != '' && img != '') {
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
                else {
                   name == '' ? alert('name required') : pwd == '' ? alert('password required') : img == '' ? alert('Source required!') : ''
                }
            }); 
        } catch(err) {
            console.log(err);
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
              <div>Email</div>
              <input type={"email"} value={email} onChange={(e) => setEmail(e.target?.value)} className="bg-black text-green-500"/>
              <div>Add your Profile Picture here!</div>
              <input type={"file"} accept="image/png , image/jpeg" onChange={handleImageChange}/>
              <div>Image: </div>
              <img src={img} style={{width: 150 , height: 100}}/>
           </div>
           <div>Will soon add Face Rekognition</div>
           <button onClick={() => signUp()}>Sign Up!</button>
        </div>
    )
}; 

export default SignUp; 