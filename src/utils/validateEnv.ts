import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

const validateEnv = () => {
    cleanEnv(process.env, {
        MONGO_URI: str(),
        PORT: port(),
    })
}

export default validateEnv;