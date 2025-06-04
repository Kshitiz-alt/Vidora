import { InputFieldType } from '@/index'
import { BsCloudUploadFill } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import React from 'react'
import Image from 'next/image';

const Inputfield = ({ id, label, accept, file, previewUrl, inputRef, onChange, onReset, type }: InputFieldType) => {
  return (
    <section>
      <label className='font-Julius' htmlFor={id}>{label}</label>
      <input type="file" id={id} accept={accept} ref={inputRef} hidden onChange={onChange} />
      <div className='border border-gray-500 rounded-2xl min-w-3xs min-h-52 flex justify-center items-center'>

        {!previewUrl ? (
          <figure className='flex gap-4' onClick={()=>inputRef.current?.click()}>
            <BsCloudUploadFill size={30} />
            <p>Click to upload your {id}</p>
          </figure>
        ) : (
          <div className='relative'>
            {type === 'video' ? <video src={previewUrl} controls /> : <Image src={previewUrl} alt="image" fill />}
            <button onClick={onReset}>
              <IoRefresh />
              <p>{file?.name}</p>
            </button>

          </div>
        )}
      </div>
    </section>
  )
}

export default Inputfield