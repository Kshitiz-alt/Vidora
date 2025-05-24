
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../libraries/authen";

export const { GET , POST } = toNextJsHandler(auth.handler)