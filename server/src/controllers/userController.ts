import { Request, Response } from "express";
import { loginValidation, registerValidation } from "../utils/validations";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middleware/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.json({ error: "帳號或密碼錯誤" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.json({ error: error.details[0].message });

  const exist = await User.findOne({ email });
  if (exist) return res.json({ error: "此信箱已被使用" });

  const user = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    return res.json({ error });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.json({ error: "找不到使用者" });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    return res.json({ error: "找不到使用者" });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    return res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return res.json({ error: "找不到使用者" });
  }
};

export const getUsers = async (_: AuthRequest, res: Response) => {
  const users = await User.find({});
  return res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    return res.json({ message: "使用者刪除" });
  } else {
    return res.json({ message: "找不到使用者" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.json(user);
  } else {
    return res.json({ error: "找不到使用者" });
  }
};
