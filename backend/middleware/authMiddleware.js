import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        next("Authentication failed");
    }

    const token = authHeader?.split(" ")[1];

    try {
        const userToken = JWT.verify(token, "myHpDGVkYruHRQ9HYvLufRgyzuoK/Xp/h0zBY0KoXDw=");

        req.body.user = {
            userId: userToken.userId,
        };

        next();
    } catch (error) {
        console.log(error);
        next("Authentication failed");
    }
};

export default userAuth;