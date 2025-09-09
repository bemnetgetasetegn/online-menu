import mySqlConnection from "../config/db.js";

// Get all menu items
export const getMenuItemsModel = async () => {
    const sql = `
        SELECT mi.*, c.name AS category_name
        FROM menu_items mi
        JOIN categories c ON mi.category_id = c.id
        ORDER BY mi.id
    `;
    const [result] = await mySqlConnection.query(sql);
    return result;
};

// Get menu items by category ID
export const getMenuItemsByCategoryModel = async (categoryId) => {
    const sql = `
        SELECT mi.*, c.name AS category_name
        FROM menu_items mi
        JOIN categories c ON mi.category_id = c.id
        WHERE c.id = ?
        ORDER BY mi.id
    `;
    const [result] = await mySqlConnection.query(sql, [categoryId]);
    return result;
};


// Get menu item by ID
export const getMenuItemByIdModel = async (id) => {
    const sql = `
        SELECT mi.*, c.name AS category_name
        FROM menu_items mi
        JOIN categories c ON mi.category_id = c.id
        WHERE mi.id = ?
    `;
    const [result] = await mySqlConnection.query(sql, [id]);
    return result[0];
};

// Create new menu item
export const createMenuItemModel = async (category_id, name, description, price, image_url) => {
    const sql = `
        INSERT INTO menu_items (category_id, name, description, price, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await mySqlConnection.query(sql, [
        category_id, name, description, price, image_url
    ]);
    return { id: result.insertId, category_id, name, description, price, image_url };
};

// Update menu item
export const updateMenuItemModel = async (id, category_id, name, description, price, image_url, is_available) => {
    const sql = `
        UPDATE menu_items
        SET category_id = ?, name = ?, description = ?, price = ?, image_url = ?, is_available = ?
        WHERE id = ?
    `;
    await mySqlConnection.query(sql, [
        category_id, name, description, price, image_url, is_available, id
    ]);
    return { id, category_id, name, description, price, image_url };
};

// Delete menu item
export const deleteMenuItemModel = async (id) => {
    const sql = "DELETE FROM menu_items WHERE id = ?";
    await mySqlConnection.query(sql, [id]);
    return true;
};
