"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const Dropdown = () => {
    const [open,setOpen] = useState(false)
    const [selected,setSelected] = useState("Most Viewed")
    return (
        <div className='absolute z-10 right-20 flex flex-col items-center gap-1 p-2 bg-white rounded-2xl hover:cursor-pointer max-sm:right-5 md:right-6' onClick={()=>setOpen(!open)}>
            <div className='flex gap-2'>

            <Image src="/DropDown.svg" width={20} height={20} alt='DropdownImg' />
            <p className='max-sm:hidden font-Julius'>{selected}</p>
            <Image src="/Drop.svg" width={20} height={20} alt='' />
            </div>
            {open && (
                <ul className='flex flex-col justify-evenly ml-4 font-Julius max-sm:font-karla'>
                    {["Most Liked","Most Recently","Oldest One"].map((label,index)=>(
                        <li className='hover:text-white hover:bg-black duration-150 ease-in p-1 rounded-[10px]' key={index} onClick={()=>setSelected(label)}>
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown