"use client";

import { useEffect, useState } from "react";
import { MyContext } from "./ThemeProvider";
import Cookies from "js-cookie";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(null);
    const [isToggleSidebar, setisToggleSidebar] = useState(false);

    useEffect(() => {
        const storedTheme = Cookies.get('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle('dark', storedTheme === 'dark');
        }
    }, []);


    const values = {
        setTheme,
        theme,
        setisToggleSidebar,
        isToggleSidebar
    }

    return (
        <MyContext.Provider value={values}>
            <div className="main flex">
                <div className={`sidebarWrapper  h-screen transition-all`} style={{width:isToggleSidebar === false ? '18%' : '0%', opacity:isToggleSidebar === false ? '1' : '0'}}>
                    <Sidebar />
                </div>

                <div className={`rightContent transition-all`}  style={{width:isToggleSidebar === false ? '82%' : '100%'}}>
                    <Header />
                    <div className="afterHeader" style={{marginTop:"90px"}}/>
                    <div className="px-4">
                        {children}
                    </div>
                </div>
            </div>
        </MyContext.Provider>
    )
}

export default ThemeProvider;