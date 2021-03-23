import bcrypt from 'bcrypt'

const saltRounds = 12

export const getHashedPass = (pass: string): Promise<string> => {
    return bcrypt.hash(pass, saltRounds)
}

export const comparePass = async (userpass: string, dbpass: string): Promise<boolean> => {
    try {
        const result = await bcrypt.compare(userpass, dbpass)
        return result
    } catch(error) {
        return error
    }
}
