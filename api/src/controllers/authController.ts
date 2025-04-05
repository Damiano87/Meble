import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// @desc Register =============================================================
// @route POST /auth
// @access Public
export const register = async (req: Request, res: Response): Promise<void> => {
  const { user, email, pwd } = req.body;

  try {
    // Check if user with this username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: user,
      },
    });

    if (existingUserByUsername) {
      res.status(409).json({ message: "Username is already taken" });
      return;
    }

    // Check if user with this email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    // Check if password is provided
    if (!pwd) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username: user,
        email,
        password: hashedPassword,
      },
    });

    // check if secrets exist
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error(
        "JWT secret keys are not defined in environment variables"
      );
    }

    // Generate a JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: newUser.username,
          email: newUser.email,
          roles: newUser.roles,
          isActive: newUser.isActive,
          id: newUser.id,
        },
      },
      accessSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: newUser.username },
      refreshSecret,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// @desc Login =================================================================
// @route POST /auth
// @access Public
export const login = async (req: Request, res: Response): Promise<void> => {
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

  // check if secrets exists
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secret keys are not defined in environment variables");
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        email: foundUser.email,
        roles: foundUser.roles,
        isActive: foundUser.isActive,
        id: foundUser.id,
      },
    },
    accessSecret,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    refreshSecret,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "none", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
};

// @desc Refresh =============================================================
// @route GET /auth/refresh
// @access Public - because access token has expired
export const refresh = (req: Request, res: Response): void => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const refreshToken = cookies.jwt;

  // check if secret exists
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secret keys are not defined in environment variables");
  }

  jwt.verify(
    refreshToken,
    refreshSecret,
    async (err: Error | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await prisma.user.findUnique({
        where: { username: (decoded as jwt.JwtPayload)?.username },
      });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            email: foundUser.email,
            roles: foundUser.roles,
            isActive: foundUser.isActive,
            id: foundUser.id,
          },
        },
        accessSecret,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout ==============================================================
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
export const logout = (req: Request, res: Response): void => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204); // No content
    return;
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ message: "Cookie cleared" });
};
