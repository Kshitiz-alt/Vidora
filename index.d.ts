import { RefObject } from "react"

declare interface SharedHeaderProps {
    subHeader: string,
    title: string,
    userImg?: string
}

declare interface SearchParams {
    params: Promise<Record<string, string>>
    searchParams: Promise<Record<string, string | undefined>>
}
declare interface params {
    params: Promise<Record<string, string>>;
}

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private"
}

declare interface VideoSection {
    id: string;
    title: string;
    thumbnail: string;
    userImg: string;
    username: string;
    createdAt: Date;
    views: number;
    visibility: Visibility;
    duration: number | null;
}

declare interface FormFieldtype {
    id: string,
    label: string,
    type?: string,
    value: string,
    onChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void,
    placeholder?: string,
    as?: "input" | "textarea" | "select"
    options?: Array<{ value: string, label: string }>
}

declare interface InputFieldType {
    id: string,
    label: string,
    accept: string,
    file: File | null,
    previewUrl: string | null,
    inputRef: RefObject<HTMLInputElement | null>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onReset: () => void
    type?: string
}

declare interface fetchAPIopts {
    method?: string,
    headers?: Record<string, string>,
    body?: object,
    expectJson?: boolean,
    type: "stream" | "storage";
}

declare interface BunnyVidRes {
    guid: string,
    status?: string,
    encodeProgress?: number
}

declare interface VideoDett {
    videoId: string,
    title: string,
    description: string,
    thumbnailUrl: string,
    tags?: string | string[],
    visibility: Visibility,
    duration?: number,
    videoUrl?: string,
    views?: number,
}
