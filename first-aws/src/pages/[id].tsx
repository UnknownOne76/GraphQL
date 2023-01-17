import { useRouter } from "next/router";
import React from "react";

export const Hello = () => {
    const router = useRouter(); 
    return (
        <div className="flex flex-col w-full h-full">
            <div className="text-red-500">Hello</div>
        </div>
    )
}; 

export default Hello; 