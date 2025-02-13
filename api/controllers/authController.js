import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// @desc Register =============================================================
// @route POST /auth
// @access Public
const register = async (req, res) => {
  const { user, email, pwd } = req.body;

  try {
    // Check if user with this username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username: user,
      },
    });

    if (existingUserByUsername) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    // Check if user with this email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Check if password is provided
    if (!pwd) {
      return res.status(400).json({ message: "Password is required" });
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

    // Generate a JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: newUser.username,
          roles: newUser.roles,
          isActive: newUser.isActive,
          id: newUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: newUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
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
const login = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await prisma.user.findUnique({
    where: { username: user },
  });

  if (!foundUser) {
    return res
      .status(401)
      .json({ message: `Nie znaleziono użytkownika ${user}` });
  }

  if (!foundUser.isActive) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (!match) return res.status(401).json({ message: "Błędne hasło" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
        isActive: foundUser.isActive,
        id: foundUser.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
};

// @desc Refresh =============================================================
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await prisma.user.findUnique({
        where: { username: decoded.username },
      });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
            isActive: foundUser.isActive,
            id: foundUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout ==============================================================
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

export default { register, login, refresh, logout };
