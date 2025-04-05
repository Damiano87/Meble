import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers["authorization"];
    if (!authHeader ||
        typeof authHeader !== "string" ||
        !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        console.error("ACCESS_TOKEN_SECRET not set in environment");
        return res.status(500).json({ message: "Server configuration error" });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        const decodedUser = decoded;
        req.user = decodedUser?.UserInfo?.username;
        req.roles = decodedUser?.UserInfo?.roles;
        req.userId = decodedUser?.UserInfo?.id;
        next();
    });
};
export default verifyJWT;
