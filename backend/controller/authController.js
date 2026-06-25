import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const registerUser = async (req, res) => {
  try {
    // 1. Destructure adminSecretKey sent from your frontend form
    const { name, email, password, adminSecretKey } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Evaluate secret key to securely establish admin privileges
    let finalAdminStatus = false;
    if (adminSecretKey && adminSecretKey === "MernMartSecret2026") {
      finalAdminStatus = true;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: finalAdminStatus, 
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, 
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, 
        token: generateToken(user._id),
      });
    }

    res.status(401).json({
      message: "Invalid Email or Password",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};