"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { VideoSection } from '..'

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  username,
  userImg,
  views,
  visibility,
  duration
}: VideoSection) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >

      <Link href={`/video/${id}`} className='relative flex flex-col gap-2 bg-white  rounded-[15px] my-5 max-sm:my-2'>
        <Image src={thumbnail} width={380} height={160} alt='thumbnail' />
        <article className='p-1'>
          <div>
            <figure className='flex gap-2 font-Julius items-center'>
              <Image className='rounded-[10px]' src={userImg} width={40} height={40} alt='' />
              <figcaption>
                <h3 className='text-[10px]'>{username}</h3>
                <p className='text-[9px]'>{visibility}</p>
              </figcaption>
              <aside className='absolute right-2 flex justify-center items-center gap-1'>
                <Image src="/eye.svg" width={17} height={17} alt='views' />
                <span>{views}</span>
              </aside>
            </figure>
          </div>
          <h2 className='text-[16px]'>{title} - {" "} {createdAt.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</h2>
        </article>
        <button className='absolute top-3 right-3 bg-white p-0.5 rounded-full' onClick={() => { }}>
          <Image src="/copy.svg" width={18} height={18} alt='copy' />
        </button>
        <button className='absolute top-13 right-3 bg-white p-0.5 rounded-full'>
          <Image src="/dots.svg" width={18} height={18} alt='dots' />
        </button>
        {duration && (
          <div className='absolute top-36 right-2 text-[15px] bg-black text-white p-1 rounded-[10px] max-sm:top-28.5'>
            {Math.ceil(duration / 60)} min
          </div>
        )}
      </Link>
    </motion.div>

  )
}

export default VideoCard
