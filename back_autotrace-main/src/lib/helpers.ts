import sha256 from 'crypto-js/sha256';

class Encryption{

    async encryptPassword(password: string) : Promise<string>{
        return await sha256(password).toString();
    }

    async matchPassword(password: string, savedPassword : string) : Promise<boolean>{
        const pass = await sha256(password).toString();
        return pass === savedPassword;
    }
}

const encrypt = new Encryption();
export default encrypt;