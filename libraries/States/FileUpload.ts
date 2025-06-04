"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react"

export const FileUpload = (maxSize: number) => {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [duration, setDuration] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const objUrlRef = useRef<string | null>(null)

    useEffect(() => {
        if (!file) return

        const objUrl = URL.createObjectURL(file)
        objUrlRef.current = objUrl

        setPreviewUrl(objUrl)
        if (file.type.startsWith('video')) {
            const video = document.createElement('video')

            video.preload = 'metadata'

            video.onloadeddata = () => {
                if (isFinite(video.duration) && video.duration > 0) {
                    setDuration(Math.round(video.duration));
                } else {
                    setDuration(0);
                }
                URL.revokeObjectURL(video.src)
            }
            video.src = objUrl;
        }

        return () => {
            if (objUrlRef.current) {
                URL.revokeObjectURL(objUrlRef.current) 
                objUrlRef.current = null
            }
        }

    }, [file])

    const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        if (selectedFile.size > maxSize) return
        setFile(selectedFile)
    }
    const resetFile = () => {
        if(objUrlRef.current){
            URL.revokeObjectURL(objUrlRef.current)
            objUrlRef.current = null
        }
        setPreviewUrl('')
        setFile(null)
        setDuration(0)
        if (inputRef.current) inputRef.current.value = ''
    }
    return { file, previewUrl, duration, inputRef, fileHandler, resetFile }
}

export const VIDEO_SIZE = 500 * 1024 * 1024
export const THUMBNAIL_SIZE = 10 * 1024 * 1024

export const BUNNY = {
    STORAGE_BASE_URL: "https://storage.bunnycdn.com/vidora2",
    CDN_URL: "https://VidoraPull.b-cdn.net",   
    TRANSCRIPT_URL: "https://vz-250e5adf-212.b-cdn.net",
    STREAM_BASE_URL: "https://video.bunnycdn.com/library",
    EMBED_URL: "https://iframe.mediadelivery.net/embed",
}