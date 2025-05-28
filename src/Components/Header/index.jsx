"use client"
import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import SearchBox from '../SearchBox';
import { MdLightMode } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { MyContext } from '@/Context/ThemeProvider';
import Cookies from "js-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMoonSharp } from "react-icons/io5";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";



const Header = () => {

    const context = useContext(MyContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const changeTheme = () => {
        const newTheme = context.theme === 'dark' ? 'light' : 'dark';
        context.setTheme(newTheme);
        Cookies.set('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }

    const toggleNav = () => {
        context?.setisToggleSidebar(!context?.isToggleSidebar)
    }


    return (
        <header className='flex fixed top-0 right-0 z-[100] px-4 py-3 justify-between shadow-md transition-all bg-white dark:bg-themeDark' style={{ width: context.isToggleSidebar === false ? '80%' : '100%' }}>
            <div className='flex items-center gap-3'>
                <Button className='!min-w-[40px] !w-[40px] !h-[40px] !rounded-full !text-gray-800 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-800' onClick={toggleNav}>
                    {
                        context.isToggleSidebar === false ? <BiMenuAltLeft size={25} /> :

                            <AiOutlineMenu size={25} />
                    }

                </Button>

                <SearchBox placeholder="Search here..." width="300px" />
            </div>


            <div className='flex items-center gap-3'>
                <Button className='!min-w-[40px] !w-[40px] !h-[40px] !rounded-full !text-gray-800 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-800 ' onClick={changeTheme}>
                    {
                        context?.theme === "light" ? <MdLightMode size={25} /> :
                            <IoMoonSharp size={20} />
                    }

                </Button>

                <Button className='!min-w-[40px] !w-[40px] !h-[40px] !rounded-full !text-gray-800 dark:!text-gray-200 hover:!bg-gray-200 dark:hover:!bg-gray-800'><FaRegBell size={22} /></Button>


                <div className='flex items-center gap-2'>
                    <Button className='!min-w-[40px] !w-[40px] !h-[40px] !rounded-full flex items-center justify-center !p-0 !overflow-hidden !bg-medium dark:!bg-blue-600 !text-white' onClick={handleClickMenu}>
                        <img src="/avatar.webp" className="w-full h-full object-cover" />
                    </Button>


                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleCloseMenu}
                        onClick={handleCloseMenu}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <div className="flex items-center gap-2">
                                <Button className='!min-w-[40px] !w-[40px] !h-[40px] !rounded-full flex items-center justify-center !p-0 !overflow-hidden !bg-medium dark:!bg-blue-600 !text-white' onClick={handleClickMenu}>
                                    <img src="/avatar.webp" className="w-full h-full object-cover" />
                                </Button>

                                <div className="info flex flex-col">
                                    <h3>Albert Flores</h3>
                                    <p>admin@gmail.com</p>
                                </div>
                            </div>
                        </MenuItem>

                        <Divider />
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <FaRegUser size={20} />
                            </ListItemIcon>
                            My Profile
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <IoSettingsOutline size={20} />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <IoMdLogOut size={20} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                </div>

            </div>
        </header>
    )
}

export default Header