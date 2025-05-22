declare interface SharedHeaderProps {
    subHeader : string,
    title : string,
    userImg? : string
}

declare interface SearchParams {
    params: Promise<Record< string ,string>>
    searchParams: Promise<Record<string,string | undefined>>
}

type visibility = string

declare interface VideoSection {
    id:string,
    title:string,
    thumbnail: string,
    createdAt: Date,
    username:string,
    userImg:string,
    views: number,
    visibility:Visibility,
    duration: number | null
}