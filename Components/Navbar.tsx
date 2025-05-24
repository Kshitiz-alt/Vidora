"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const user = {}

const Navbar = () => {
    const router = useRouter()
    return (
        <nav className='h-20 flex justify-between items-center mx-5'>
            <Link href="/">

                <Image className='' src="/Logo.svg" priority={true} height={32} width={113} alt='Logo' />
            </Link>
            {user && (
                <figure className='flex gap-2'>
                    <button className='hover:cursor-pointer' onClick={()=> router.push('/profile/id')}>
                        <Image className='rounded-full' src="https://placehold.co/30x30" priority={true} width={50} height={50} alt='Profile-Pic'/>
                    </button>
                    <button>
                        <Link href="/sign-in">
                        <Image src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=000000" width={30} height={30} alt=''/>
                        </Link>
                    </button>
                </figure>
            )}

        </nav>
    )
}

export default Navbar