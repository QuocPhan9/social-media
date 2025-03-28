import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (useValue) => {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(useValue, salt);
    return hashPassword;
};      
export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
}

//JSONWEBTOKEN
export function createJWT(id) {
    return JWT.sign({userId: id}, process.env.JWT_SECRET,{
        expiresIn: "1d"
    })
}
