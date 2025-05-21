import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
    return (
        <header className='flex flex-col gap-9'>
            <section className='flex justify-between'>
                <div className='flex flex-col'>
                    {userImg && (
                        <Image src={userImg || "https://placehold.co/30x30"} width={30} height={30} alt='' />
                    )}
                    <article>
                        <p className='text-[14px]'>{subHeader}</p>
                        <h1 className='text-3xl font-semibold'>{title}</h1>
                    </article>
                </div>
                <aside className='flex justify-center items-center gap-4'>
                    <Link href="/upload" className='flex gap-2 bg-white text-black p-4 rounded-[35px] border-[1px] '>
                        <Image src="/upload.svg" width={17} height={17} alt='' />
                        <p className='text-[10px] font-semibold'>Upload a video</p>
                    </Link>
                    <Link href="/upload" className='flex gap-2 bg-black text-white p-4 rounded-[35px]'>
                        <Image src="/video.svg" width={17} height={17} alt='' />
                        <p className='text-[10px] font-semibold'>Record a Video</p>
                    </Link>
                </aside>
                
            </section>
        </header>
    )
}

export default Header