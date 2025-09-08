import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmail, createAdmin } from "../Models/authModel.js";

// ================== REGISTER ADMIN ==================
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check existing admin
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await createAdmin(name, email, password_hash);

        res.status(201).json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to register admin" });
    }
};

// ================== LOGIN ADMIN ==================
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await findAdminByEmail(email);
        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, admin.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);  // <---- ADD THIS
        res.status(500).json({ success: false, message: "Login failed" });
    }
};

