import React from 'react'
import { IoSearch } from "react-icons/io5";


const SearchBox = (props) => {
  return (
    <div className={`searchBox relative`} style={{width:props.width}}>
      <IoSearch size={18} className='absolute top-[12px] left-[10px]  text-gray-500'/>
      <input type='text' placeholder={props.placeholder} className='w-full h-[40px] outline-none border border-[rgba(0,0,0,0.2)] dark:border-[rgba(255,255,255,0.1)] rounded-md px-3 pl-8 text-[14px] focus:border-[rgba(0,0,0,0.4)] dark:focus:border-[rgba(255,255,255,0.3)] dark:bg-themeDark'/>
    </div>
  )
}

export default SearchBox