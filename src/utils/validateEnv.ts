import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

// if (process.env.NODE_ENV !== 'production') {
//     // process.env.VERCEL_URL = 'localhost:3000';
//     process.env.NEXT_PUBLIC_BASE_URL = 'localhost:3000';
//     console.log('process.env.NEXT_PUBLIC_BASE_URL :>> ', process.env.NEXT_PUBLIC_BASE_URL);
// } else {
//     process.env.NEXT_PUBLIC_BASE_URL = process.env.VERCEL_URL;
// }

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGODB_URI: str(),
    NEXT_PUBLIC_BASE_URL: str(),
    // PORT: port(),
});