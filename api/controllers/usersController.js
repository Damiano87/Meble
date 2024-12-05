import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    omit: { password: true },
  });

  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Create a user
// @route POST /users
// @access Private
const createUser = async (req, res) => {
  const { username, password, email, roles } = req.body;

  // Confirm data
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await prisma.user.findUnique({ where: { username } });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
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
const updateUser = async (req, res) => {
  const { id, username, password, email, roles, isActive } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (roles) {
    if (!Array.isArray(roles) || !roles?.length) {
      return res.status(400).json({ message: "At least one role is required" });
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

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Delete user
  const deletedUser = await prisma.user.delete({ where: { id } });

  res.status(200).json({
    message: `User ${deletedUser.username} with ID ${deletedUser.id} deleted`,
  });
};

export default { getAllUsers, createUser, updateUser, deleteUser };
