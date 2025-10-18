import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";


export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    MONGODB_URI: str(),
    // PORT: port(),
});