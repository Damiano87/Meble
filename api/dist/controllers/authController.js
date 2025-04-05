import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
    const { user, email, pwd } = req.body;
    try {
        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username: user,
            },
        });
        if (existingUserByUsername) {
            res.status(409).json({ message: "Username is already taken" });
            return;
        }
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUserByEmail) {
            res.status(400).json({ message: "User with this email already exists" });
            return;
        }
        if (!pwd) {
            res.status(400).json({ message: "Password is required" });
            return;
        }
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = await prisma.user.create({
            data: {
                username: user,
                email,
                password: hashedPassword,
            },
        });
        const accessSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        if (!accessSecret || !refreshSecret) {
            throw new Error("JWT secret keys are not defined in environment variables");
        }
        const accessToken = jwt.sign({
            UserInfo: {
                username: newUser.username,
                email: newUser.email,
                roles: newUser.roles,
                isActive: newUser.isActive,
                id: newUser.id,
            },
        }, accessSecret, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ username: newUser.username }, refreshSecret, { expiresIn: "7d" });
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
export const login = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const foundUser = await prisma.user.findUnique({
        where: { username: user },
    });
    if (!foundUser) {
        res.status(401).json({ message: `Nie znaleziono użytkownika ${user}` });
        return;
    }
    if (!foundUser.isActive) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
        res.status(401).json({ message: "Błędne hasło" });
        return;
    }
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secret keys are not defined in environment variables");
    }
    const accessToken = jwt.sign({
        UserInfo: {
            username: foundUser.username,
            email: foundUser.email,
            roles: foundUser.roles,
            isActive: foundUser.isActive,
            id: foundUser.id,
        },
    }, accessSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ username: foundUser.username }, refreshSecret, { expiresIn: "7d" });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
};
export const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const refreshToken = cookies.jwt;
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secret keys are not defined in environment variables");
    }
    jwt.verify(refreshToken, refreshSecret, async (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        const foundUser = await prisma.user.findUnique({
            where: { username: decoded?.username },
        });
        if (!foundUser)
            return res.status(401).json({ message: "Unauthorized" });
        const accessToken = jwt.sign({
            UserInfo: {
                username: foundUser.username,
                email: foundUser.email,
                roles: foundUser.roles,
                isActive: foundUser.isActive,
                id: foundUser.id,
            },
        }, accessSecret, { expiresIn: "15m" });
        res.json({ accessToken });
    });
};
export const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({ message: "Cookie cleared" });
};
