"use client"
import Image from 'next/image'
import Link from 'next/link'
import { RiStarSFill } from "react-icons/ri";
import React from 'react'
import { authenClient } from '../../../libraries/auth-client';


const page = () => {
  

const SignIn = async() => {
  return await authenClient.signIn.social({provider:'google'})
}

  return (
    <section>
      <nav className='h-20 absolute flex justify-between items-center mx-5'>
        <Link href="/">
          <Image className='' src="/Logo.svg" priority={true} height={32} width={113} alt='Logo' />
        </Link>
      </nav>
      <aside className='w-full h-full flex flex-row-reverse max-sm:flex-col'>
        <div className='w-1/2 flex justify-center items-center min-h-screen bg-linear-to-r from-white from-10% to-black max-sm:w-full max-sm:bg-gradient-to-b max-sm:from-black max-sm:to-white'>
          <figure className='bg-white w-[70%] flex flex-col gap-4 justify-center items-center p-7 rounded-[20px]'>
            <Image src="/Logo.svg" priority={true} height={32} width={113} alt='Logo' />
            <p className='font-Julius text-[18px] text-center max-w-[70%] font-extrabold max-sm:text-[12px]'>Create and share your very first  <span className='text-blue-400'> Vidora video </span> in no time!</p>
            <button onClick={SignIn} className='w-3/4  rounded-[10px] p-2 border-[0.5px] border-black shadow shadow-black hover:shadow-2xs duration-200 ease-in max-sm:w-[85%] max-sm:text-[12px] '>
              <Link href="/" className='flex gap-2 justify-center items-center'>
                <Image src="/google.svg" width={15} height={15} alt='google' />
                <p>Sign in with Google</p>
              </Link>
            </button>
          </figure>
        </div>
        <div className='w-1/2 min-h-screen bg-white flex justify-center items-center max-sm:w-full'>
          <figure className='w-[75%] flex flex-col items-center gap-4'>
            <div className='flex'>

              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <RiStarSFill />
                </div>
              ))}
            </div>
            <p className='text-center text-2xl'>Vidora makes screen recording easy. From quick walkthroughs to full presentations, it&apos;s fast, smooth, and shareable in seconds</p>
            <Image className='rounded-full' src="https://placehold.co/45x45" width={45} height={45} alt='userImage' />
            <div className='text-center flex flex-col -gap-y-5'>
              <p>Jack Rivera</p>
              <p className='text-gray-950/60'>Web Designer ,MegaByte.Co</p>
            </div>
          </figure>
        </div>
      </aside>


    </section>
  )
}

export default page