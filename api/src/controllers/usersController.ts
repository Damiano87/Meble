import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      lastName: true,
      company: true,
      city: true,
      country: true,
      phoneNumbers: true,
      NIP: true,
      apartmentNr: true,
      street: true,
      postalCode: true,
      password: false,
      avatar: true,
      roles: true,
      isActive: true,
      createdAt: true,
      cartItems: true,
      ratings: true,
      wishlist: true,
      orders: true,
    },
  });

  if (!users?.length) {
    res.status(400).json({ message: "No users found" });
    return;
  }

  res.json(users);
};

// @desc Get specific user
// @route GET /user
// @access Private
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        lastName: true,
        company: true,
        city: true,
        country: true,
        phoneNumbers: true,
        NIP: true,
        apartmentNr: true,
        street: true,
        postalCode: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Create a user
// @route POST /users
// @access Private
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password, email, roles } = req.body;

  // Confirm data
  if (!username || !password || !email) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  // Check for duplicate username
  const duplicate = await prisma.user.findUnique({ where: { username } });

  if (duplicate) {
    res.status(409).json({ message: "Duplicate username" });
    return;
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, email, password: hashedPwd }
      : { username, email, password: hashedPwd, roles };

  // Create and store new user
  const user = await prisma.user.create({ data: userObject });

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

// @desc Update a user
// @route PATCH /users
// @access Private
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, username, password, email, roles, isActive } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (roles) {
    if (!Array.isArray(roles) || !roles?.length) {
      res.status(400).json({ message: "At least one role is required" });
      return;
    }
  }

  const updatedPassword = password
    ? await bcrypt.hash(password, 10)
    : undefined;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { username, email, password: updatedPassword, roles, isActive },
  });

  res.status(200).json({
    message: "Success",
    data: updatedUser,
  });
};

// @desc Update a user for delivery
// @route PATCH /users/delivery
// @access Private
export const updateUserInfoForDelivery = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // prepare data for update
    const updateData: Record<string, any> = {};
    const fieldsMapping: Record<string, keyof typeof user> = {
      username: "username",
      lastName: "lastName",
      email: "email",
      NIP: "NIP",
      apartmentNr: "apartmentNr",
      city: "city",
      company: "company",
      country: "country",
      phoneNumbers: "phoneNumbers",
      postalCode: "postalCode",
      street: "street",
    };

    Object.entries(fieldsMapping).forEach(([reqField, dbField]) => {
      if (req.body[reqField]) {
        updateData[dbField] = req.body[reqField];
      }
    });

    // update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.status(200).json(updatedUser);
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating user:", errorMessage);
    res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
    return;
  }
};

// @desc Update a user password
// @route PATCH /users/password
// @access Private
export const updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const { userPassword } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // check if userPassword is provided
    if (!userPassword) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // update user password
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json(updatedUser);
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating user:", errorMessage);
    res
      .status(500)
      .json({ message: "Internal server error", error: errorMessage });
    return;
  }
};

// @desc Delete a user
// @route DELETE /users
// @access Private
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    res.status(400).json({ message: "User ID Required" });
    return;
  }

  // Does the user exist to delete?
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // Delete user
  const deletedUser = await prisma.user.delete({ where: { id } });

  res.status(200).json({
    message: `User ${deletedUser.username} with ID ${deletedUser.id} deleted`,
  });
};
