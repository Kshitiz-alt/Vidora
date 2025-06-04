"use client"

import Formfield from '@/Components/uploadForm/Formfield'
import Inputfield from '@/Components/uploadForm/Inputfield'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileUpload, THUMBNAIL_SIZE, VIDEO_SIZE } from '@/libraries/States/FileUpload'
import { getThumbnailUrl, getVideoUrl, VidDetails } from '@/libraries/States/Videos'
import { useRouter } from 'next/navigation'
import { Visibility } from '@/index'

const bunnyUpload = (file: File, UploadUrl: string, accesskey: string): Promise<void> => {
    return fetch(UploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
            AccessKey: accesskey,
        },
        body: file,
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`upload failed with status:${response.status}`)
        }
    })
}

const Uploadpage = () => {

    //State managements --
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
        visibility: "public"
    })
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('')
    const [videoDuration, setVideoDuration] = useState(0)

    //Routing
    const router = useRouter()

    //Handlers
    const OnChangeHandle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }


const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    try {
        // 1. Validate inputs
        if (!video.file || !thumbnail.file) {
            throw new Error('Please upload both Video and thumbnail');
        }
        if (!formData.title || !formData.description) {
            throw new Error('Please provide Title and Description');
        }

        // 2. Get video credentials with verification
        const {videoId , UploadUrl: videoUploadUrl , accessKey:videoAccessKey} = await getVideoUrl();

        
        if (!videoId || !videoUploadUrl || !videoAccessKey) {
            throw new Error("Failed to get valid video credentials");
        }

        // 3. Upload video
        await bunnyUpload(video.file, videoUploadUrl, videoAccessKey);

        // 4. Get thumbnail credentials
        const {UploadUrl:thumbnailUrl , cdnUrl:thumbnailCDNurl , accessKey : thumbnailAccessKey } = await getThumbnailUrl(videoId);


        if (!thumbnailUrl || !thumbnailCDNurl || !thumbnailAccessKey) {
            throw new Error("Failed to get thumbnail credentials");
        }

        // 5. Upload thumbnail
       
        await bunnyUpload(thumbnail.file, thumbnailUrl, thumbnailAccessKey);

        // 6. Save video details
        await VidDetails({
            videoId,
            videoUrl: videoUploadUrl,
            thumbnailUrl: thumbnailCDNurl,
            ...formData,
            duration: videoDuration,
            visibility: formData.visibility as Visibility,
        });
        
        router.push(`/video/${videoId}`);

    } catch (error) {
        console.error('Upload failed:', error);
        setError('Upload failed. Please try again.');
    } finally {
        setSubmit(false);
    }
};

    const video = FileUpload(VIDEO_SIZE)
    const thumbnail = FileUpload(THUMBNAIL_SIZE)

    useEffect(() => {
        if (!video.duration === null || 0) {
            setVideoDuration(video.duration)
        }
    }, [video.duration])

    return (
        <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className=' h-[140vh] flex flex-col gap-5 justify-center items-center bg-homePage max-sm:min-h-[150vh]'>
            <header className='text-2xl font-Julius max-sm:pt-5'>Upload a video</header>
            {error && <div>{error}</div>}
            <div className='bg-white w-5/12 h-[120vh] rounded-2xl shadow-2xs flex flex-col gap-6 px-5 py-7 max-sm:h-[150vh] '>
                <form className=' flex flex-col gap-4' onSubmit={submitHandler}>
                    <Formfield
                        id="title"
                        label="Title"
                        value={formData.title}
                        onChange={OnChangeHandle}
                        placeholder="Enter your video title"
                        as='textarea'
                    />
                    <Formfield
                        id="description"
                        label="description"
                        value={formData.description}
                        onChange={OnChangeHandle}
                        placeholder="describe what this video is about"
                        as="textarea"
                    />
                    <Inputfield
                        id="video"
                        label="Video"
                        accept="video/*"
                        file={video.file}
                        previewUrl={video.previewUrl}
                        inputRef={video.inputRef}
                        onChange={video.fileHandler}
                        onReset={video.resetFile}
                        type="video"
                    />
                    <Inputfield
                        id="thumbnail"
                        label="Thumbnail"
                        accept="image/*"
                        file={thumbnail.file}
                        previewUrl={thumbnail.previewUrl}
                        inputRef={thumbnail.inputRef}
                        onChange={thumbnail.fileHandler}
                        onReset={thumbnail.resetFile}
                        type="image"
                    />
                    <Formfield
                        id="visibility"
                        label="visibility"
                        value={formData.visibility}
                        onChange={OnChangeHandle}
                        as="select"
                        options={[
                            { value: "public", label: "Public" },
                            { value: "private", label: "Private" }
                        ]} />
                    <button className='text-2xl font-semibold font-Julius py-5 w-full border-2 border-blue-500 rounded-3xl hover:bg-blue-300 duration-300 ease-in cursor-pointer' disabled={submit} type='submit'>
                        {
                            submit ?
                                'Uploading...' : 'Upload Video'

                        }
                    </button>
                </form>
            </div>
        </motion.section>
    )
}

export default Uploadpage