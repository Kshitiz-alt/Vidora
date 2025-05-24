import { createAuthClient } from "better-auth/react";

export const authenClient = createAuthClient({
    baseURL:process.env.NEXT_BASE_URL!,
    
})