import bcryptjs from 'bcryptjs';
import { hash } from 'bcryptjs';

export async function hashPassword(password){
    return await hash(password, 12);
}

export async function comparePassword(password, hashedPassword){
    return await bcryptjs.compare(password, hashedPassword);
}