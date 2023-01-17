import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface Props {
    children?: ReactNode
}

const Layout = ({children, ...props}: Props) => {
    return (
        <>
        <Header/>
        <main {...props}>{children}</main>
        <Footer />
        </>
    )
}; 

export default Layout; 