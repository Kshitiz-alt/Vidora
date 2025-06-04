"use server"

import { headers } from "next/headers"
import { fetchAPI, helpENV, withErrorHandling } from "../utils/utils"
import { BUNNY } from "./FileUpload"
import { auth } from "../authen"
import { BunnyVidRes, VideoDett } from "@/index"
import { db } from "@/drizzle/db"
import { user, videos } from "@/drizzle/schemas"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

const VIDEO_STREAM_URL = "https://video.bunnycdn.com/library";
const THUMBNAIL_URL = "https://storage.bunnycdn.com/vidora2"
const THUMBNAIL_CDN = "https://VidoraPull.b-cdn.net"
const BUNNY_LIB_ID = helpENV("BUNNY_LIB_ID");
const ACCESS_KEYS = {
    streamAccessKey: helpENV("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey: helpENV("BUNNY_STORAGE_ACCESS_KEY")
}

const ReVal = (allPaths: string[]) => {
    allPaths.forEach(path => {
        revalidatePath(path)

    });
}

const getServerID = async (): Promise<string> => {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) {
        throw new Error(`Unauthenticated ${Error}`)
    }
    return session.user.id
}

export const getVideoUrl = withErrorHandling(async () => {
    // 1. Fetch user info
    let user;
    try {
        user = await getServerID();
        console.log("Authenticated user:", user);
    } catch (err) {
        console.error("Error fetching user ID:", err);
        throw new Error("Failed to authenticate user.");
    }

    // 2. Validate Bunny.net config
    try {
        if (!BUNNY_LIB_ID || !ACCESS_KEYS.streamAccessKey) {
            console.error("Missing Bunny.net configuration:");
            console.log("BUNNY_LIB_ID:", BUNNY_LIB_ID);
            console.log("Stream Access Key present:", !!ACCESS_KEYS.streamAccessKey);
            throw new Error("Server configuration error - missing Bunny.net credentials");
        }
    } catch {
        throw new Error("Environment validation failed. Please check Bunny credentials.");
    }

    // 3. Make Bunny API request
    try {
        const apiUrl = `${VIDEO_STREAM_URL}/${BUNNY_LIB_ID}/videos`;
        console.log("Making request to:", apiUrl);

        const VidResponse = await fetchAPI<BunnyVidRes>(apiUrl, {
            method: "POST",
            type: "stream",
            headers: {
                "AccessKey": ACCESS_KEYS.streamAccessKey,
                "Content-Type": "application/json"
            },
            body: {
                title: "Untitled Video",
                collectionId: ""
            }
        });

        console.log("API Response:", VidResponse);

        if (!VidResponse?.guid) {
            throw new Error("Invalid response from Bunny API - missing video GUID");
        }

        const UploadUrl = `${VIDEO_STREAM_URL}/${BUNNY_LIB_ID}/videos/${VidResponse.guid}`;
        console.log("Generated Upload URL:", UploadUrl);

        return {
            videoId: VidResponse.guid,
            UploadUrl,
            accessKey: ACCESS_KEYS.streamAccessKey
        };
    } catch (error) {
        console.error("Detailed error in Bunny API call:", error);
        throw new Error("Failed to get video upload credentials. Please try again.");
    }
});

export const getThumbnailUrl = withErrorHandling(async (videoId: string) => {
    const fileName = `${Date.now()}-${videoId}-thumbnail`
    const UploadUrl = `${THUMBNAIL_URL}/thumbnails/${fileName}`
    const cdnUrl = `${THUMBNAIL_CDN}/thumbnails/${fileName}`

    return {
        UploadUrl,
        cdnUrl,
        accessKey: ACCESS_KEYS.storageAccessKey
    }
})

export const VidDetails = withErrorHandling(async (VideoDet: VideoDett) => {
    const userId = await getServerID()

    await fetchAPI(
        `${VIDEO_STREAM_URL}/${BUNNY_LIB_ID}/videos/${VideoDet.videoId}`,
        {
            method: "POST",
            type: "stream",
            body: {
                title: VideoDet.title,
                description: VideoDet.description
            }
        }

    )

    await db.insert(videos).values({
        ...VideoDet,
        videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIB_ID}/${VideoDet.videoId}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    ReVal(['/'])

    return { videoId: VideoDet.videoId }
})

const buildVideoWithUserQuery = () => {
    db
        .select({
            video: videos,
            user: { id: user.id, name: user.name, image: user.image },
        })
        .from(videos)
        .leftJoin(user, eq(videos.userId, user.id));
}

export const getVideobyId = withErrorHandling(async (videoId: string) => {
    const [videoRecord] = await buildVideoWithUserQuery().where(
        eq(videos.videoId,videoId)
    )
    return videoRecord

})