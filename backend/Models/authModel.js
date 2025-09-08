import mySqlConnection from "../config/db.js";

// ================== FIND ADMIN BY EMAIL ==================
export const findAdminByEmail = async (email) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    const [rows] = await mySqlConnection.query(sql, [email]);
    return rows[0]; // return single admin or undefined
};

// ================== CREATE ADMIN ==================
export const createAdmin = async (name, email, password_hash) => {
    const sql = `
        INSERT INTO admin (name, email, password_hash, created_at)
        VALUES (?, ?, ?, NOW())
    `;
    const [result] = await mySqlConnection.query(sql, [name, email, password_hash]);
    return { id: result.insertId, name, email };
};
