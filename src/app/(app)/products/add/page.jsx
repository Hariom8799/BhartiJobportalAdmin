"use client"
import React, { useState } from 'react'
import Editor from 'react-simple-wysiwyg';

const AddProduct = () => {

  const [html, setHtml] = useState('');

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <>
      <h1 className="text-[20px] font-[600]">Create product</h1>

      <form>
        <div className="flex gap-3 mt-3">
          <div className='w-[40%] flex flex-col gap-3'>
            <div className="card dark:bg-themeDark w-full p-4 dark:border-[rgba(255,255,255,0.1)]">
              <h2 className="text-[18px] font-[600] mb-4">Basic Information</h2>


              <div className="col_ mb-4">
                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Product name</label>
                <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Product name" />
              </div>


              <div className="col_ mb-4">
                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Product code</label>
                <input type="text" className='w-full h-[45px] border border-[rgba(0,0,0,0.1)] outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md px-3 bg-gray-100' placeholder="Product code" />
              </div>


              <div className="col_ mb-4">
                <label className='mb-2 block font-[500] text-gray-600 text-[14px]'>Description</label>
                <Editor value={html} onChange={onChange} />
              </div>





            </div>
          </div>
        </div>
      </form>

    </>
  )
}

export default AddProduct