import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

if (process.env.NODE_ENV !== 'production') {
    process.env.VERCEL_URL = 'localhost:3000';
}

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGODB_URI: str(),
    // PORT: port(),
});