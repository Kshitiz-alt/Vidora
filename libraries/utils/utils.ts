

import { fetchAPIopts } from "@/index";
import clsx from "clsx";
import { ClassValue } from "clsx";
// import { sql } from "drizzle-orm";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const helpENV = (key: string, fallback?: string): string => {
    const value = process.env[key];

    if (!value) {
        if (fallback !== undefined) {
            console.warn(`Using fallback value for ${key}`);
            return fallback;
        }
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const fetchAPI = async<T = Record<string, unknown>>(

    url: string,
    options: Omit<fetchAPIopts, "type"> & {
        type: "stream" | "storage";
    }
): Promise<T> => {
    const {
        method = "GET",
        headers = {},
        body,
        expectJson = true,
        type,
    } = options;


    const key = helpENV(type === "stream" ? "BUNNY_STREAM_ACCESS_KEY" : "BUNNY_STORAGE_ACCESS_KEY");

    const reqHeaders = {
        ...headers,
        AccessKey: key,
        ...(type === "stream" && {
            accept: "application/json",
            ...(body && { "content-type": "application/json" })
        })
    }

    const reqOptions: RequestInit = {
        method,
        headers: reqHeaders,
        ...(body && { body: JSON.stringify(body) })
    }

    const response = await fetch(url, reqOptions)

    if (!response.ok) {
        const errortext = await response.text()
        throw new Error(`API error : ${errortext}`)
    }

    if (method === "DELETE" || !expectJson) {
        return true as T;
    }

    return await response.json()
}


// export const getOrderByClause = (filter?: string) => {
//     switch (filter) {
//         case "Most Viewed":
//             return sql`${videos.views} DESC`;
//         case "Least Viewed":
//             return sql`${videos.views} ASC`;
//         case "Oldest First":
//             return sql`${videos.createdAt} ASC`;
//         case "Most Recent":
//         default:
//             return sql`${videos.createdAt} DESC`;
//     }
// };

export const withErrorHandling = <T, A extends unknown[]>(
    fn: (...args: A) => Promise<T>
) => {
    return async (...args: A): Promise<T> => {
        try {
            const result = await fn(...args);
            return result;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error occurred";
            return errorMessage as unknown as T;
        }
    };
};

export const updateURLParams = (
  currentParams: URLSearchParams,
  updates: Record<string, string | null | undefined>,
  basePath: string = "/"
): string => {
  const params = new URLSearchParams(currentParams.toString());

  // Process each parameter update
  Object.entries(updates).forEach(([name, value]) => {
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
  });

  return `${basePath}?${params.toString()}`;
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

