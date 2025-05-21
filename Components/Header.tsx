"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Dropdown from './subComponents/Dropdown'



const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
    return (
        <header className='flex flex-col gap-9'>
            <section className='flex justify-between'>
                <div className='flex gap-1'>
                    {userImg && (
                        <Image className='rounded-full max-sm:hidden' src={userImg} width={66} height={66} alt='' />
                    )}
                    <article className='flex flex-col max-sm:py-5'>
                        <p className='text-[14px] max-sm:text-[10px] font-Julius'>{subHeader}</p>
                        <h1 className='text-3xl font-semibold max-sm:text-[20px] font-Julius'>{title}</h1>
                    </article>
                </div>
                <aside className='flex justify-center items-center gap-4 max-sm:flex-col'>
                    <Link href="/upload" className='flex gap-2 bg-white text-black p-4 rounded-[35px] border-[1px]'>
                        <Image src="/upload.svg" width={17} height={17} alt='upload-Icon' />
                        <h1 className='text-[10px] font-semibold flex gap-1 font-Julius'>
                            <p>Upload</p>
                            <span className='max-sm:hidden'>a video</span>
                        </h1>
                    </Link>
                    <Link href="/upload" className='flex gap-2 bg-black text-white p-4 rounded-4xl'>
                        <Image src="/video.svg" width={17} height={17} alt='Video-Icon' />
                        <h1 className='text-[10px] font-semibold flex gap-1 font-Julius'>
                            <p>Record</p>
                            <span className='max-sm:hidden'>a Video </span>
                        </h1>
                    </Link>
                </aside>

            </section>
            <section className='flex justify-between'>
                <div className='w-lg gap-5 h-10 p-3 bg-white flex rounded-4xl max-sm:w-[70%]'>

                    <Image src="/search.svg" width={20} height={20} alt='search-Icon' />
                    <input className='w-2xl py-2 outline-0 max-sm:text-[10px] max-sm:py-1 font-karla' type="text" placeholder='Search for people & vildoras . . . .' />
                </div>
                <Dropdown />
            </section>
        </header>
    )
}

export default Header