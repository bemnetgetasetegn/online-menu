import express from "express";
import { 
    getCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../Controllers/categoriesController.js";
import {
    getMenuItems,
    getMenuItemsByCategory,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from "../Controllers/menuItemsController.js";
import { loginAdmin, registerAdmin } from "../Controllers/authController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();


//-----Category-------//

// Get all categories
router.get("/categories", getCategories);

// Get category by ID
router.get("/categories/:id", getCategoryById);

// Create new category
router.post("/categories", verifyToken, createCategory);

// Update category by ID
router.put("/categories/:id", verifyToken, updateCategory);

// Delete category by ID
router.delete("/categories/:id", verifyToken, deleteCategory);


// ------- menu items --------//

// Get all menu items
router.get("/menu-items", getMenuItems);

// Get menu items by category
router.get("/menu-items/category/:categoryId", getMenuItemsByCategory);

// Get single menu item by ID
router.get("/menu-items/:id", getMenuItemById);

// Create new menu item
router.post("/menu-items", verifyToken, createMenuItem);

// Update menu item
router.put("/menu-items/:id", verifyToken, updateMenuItem);

// Delete menu item
router.delete("/menu-items/:id", verifyToken, deleteMenuItem);

// ===== admin ========== //

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


export default router;
