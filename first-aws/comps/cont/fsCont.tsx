import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { createContext, useState , useEffect, SetStateAction, Dispatch } from 'react';  
import { userPool } from '@/utils/aws';
import { awsAPI } from '@/utils/api';

interface Props {
    children?: React.ReactNode
};

export type Context = {
    st: string;
    usr: any;
    onStateChanged: () => Promise<unknown>;
    setUsr: Dispatch<any>; 
    signOut: () => void;
}; 

export const FsContext = createContext<null | Context>({} as Context); 


export const FsContextPrv = ({children}: Props) => {
    const [st , setSt] = useState<string>('User not logged in!');
    const [usr , setUsr] = useState<any | string>(''); 
    const user = userPool?.getCurrentUser(); 

    useEffect(() => {
        if(user) {
            awsAPI.get(`user/get/${user.getUsername()}`).then((res) => {
                window.localStorage.setItem('userData' , JSON.stringify(res.data.data));  
                setUsr(JSON.parse(localStorage.getItem('userData') as any));
            }); 
        }
    }, []); 

    const onStateChanged = async () => {
        return await new Promise((res, rej) => {
            if(user) { 
                user.getSession((err: any, ses: any) => {
                    setSt(`User Logged in! userName: ${user.getUsername()}`); 
                     if(err) return console.log(err) , rej(err); 
                     res(ses);
                     console.log(ses);  
                })
            }
            else {
                console.log('User not logged in!'); 
                setSt('User not logged in!'); 
                rej('User not logged in!');
                return window.location.href = '/signIn' 
            }  
        }) 
    };

    const signOut = () => {
        const user = userPool.getCurrentUser();
        window.localStorage.removeItem('userData'); 
        user?.signOut();
        setSt('User not logged in!');  
    }; 

    return (
        <FsContext.Provider value={{st , onStateChanged, signOut , usr , setUsr}}>{children}</FsContext.Provider>
    )
}; 

export default FsContextPrv; 