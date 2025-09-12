import mySqlConnection from "../Config/db.js";

// Get all categories
export const getCategoriesModel = async () => {
    const sql = "SELECT * FROM categories ORDER BY id";
    const [result] = await mySqlConnection.query(sql);
    return result;
};

// Get category by ID
export const getCategoryByIdModel = async (id) => {
    const sql = "SELECT * FROM categories WHERE id = ?";
    const [result] = await mySqlConnection.query(sql, [id]);
    return result[0];
};

// Create new category
export const createCategoryModel = async (name, description) => {
    const sql = "INSERT INTO categories (name, description, created_at) VALUES (?, ?, NOW())";
    const [result] = await mySqlConnection.query(sql, [name, description]);
    return { id: result.insertId, name, description };
};

// Update category
export const updateCategoryModel = async (id, name, description) => {
    const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
    const [result] = await mySqlConnection.query(sql, [name, description, id]);
    return { id, name, description };
};

// Delete category
export const deleteCategoryModel = async (id) => {
    const sql = "DELETE FROM categories WHERE id = ?";
    await mySqlConnection.query(sql, [id]);
    return true;
};
