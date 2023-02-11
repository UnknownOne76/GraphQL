import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { createContext, useState , useEffect } from 'react';  
import { userPool } from '@/utils/aws';

interface Props {
    children?: React.ReactNode
};

export type Context = {
    st: string;
    onStateChanged: () => Promise<unknown>;
    signOut: () => void;
}; 

export const FsContext = createContext<null | Context>({} as Context); 


export const FsContextPrv = ({children}: Props) => {
    const [st , setSt] = useState<string>('User not logged in!');

    const onStateChanged = async () => {
        return await new Promise((res, rej) => {
            const user = userPool?.getCurrentUser();  
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
            }  
        }) 
    };

    const signOut = () => {
        const user = userPool.getCurrentUser();
        user?.signOut();
        setSt('User not logged in!');  
    }; 

    return (
        <FsContext.Provider value={{st , onStateChanged, signOut}}>{children}</FsContext.Provider>
    )
}; 

export default FsContextPrv; 