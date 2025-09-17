import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import ItemCard from "../components/ItemCard";
import { useI18n } from "../i18n.jsx";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const itemsSectionRef = useRef(null);
  const { t } = useI18n();


  

  const API_URL = "https://online-menu-m79q.onrender.com/api";

  // Fetch all categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        setCategories(res.data.data || []);
        // Select "All" category by default, but do NOT scroll on initial load
        setSelectedCategory({ id: 'all', name: 'All' });
        // Optionally, fetch all menu items without scrolling
        const itemsRes = await axios.get(`${API_URL}/menu-items`);
        const items = itemsRes.data.data || itemsRes.data || [];
        setMenuItems(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch menu items when a category is selected
  const handleCategoryClick = async (category) => {
  setSelectedCategory(category);
  setQuery(""); // Reset search value
  setLoading(true);
    try {
      let res;
      if (category.id === 'all') {
        // Fetch all menu items
        res = await axios.get(`${API_URL}/menu-items`);
      } else {
        // Fetch items by category
        res = await axios.get(`${API_URL}/menu-items/category/${category.id}`);
      }
      // Handle different possible response structures
      const items = res.data.data || res.data || [];
      setMenuItems(Array.isArray(items) ? items : []);
      // Only scroll if this is a real user interaction (not initial load)
      if (itemsSectionRef.current) {
        itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="container-narrow px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-stone-800 mb-3">{t('ourMenu')}</h1>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-4"></div>
            <p className="text-stone-600 max-w-2xl mx-auto">{t('discoverSubtitle')}</p>
          </div>

          {/* Sticky Search Bar */}
          <div className="w-full sticky top-0 z-40 pt-2 pb-2 mb-6">
            <SearchBar
              value={query}
              onChange={(val) => {
                setQuery(val);
                // Only scroll if user actually types something
                if (val.trim() !== "" && itemsSectionRef.current) {
                  itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              placeholder={t('searchPlaceholder')}
            />
          </div>
          {/* Categories */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <CategoryPills
              categories={categories}
              selectedId={selectedCategory?.id}
              onSelect={handleCategoryClick}
            />
          </div>

          {/* Menu Items */}
          <div ref={itemsSectionRef}>
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="h-6 w-48 skeleton mb-2" />
                        <div className="h-4 w-64 skeleton" />
                      </div>
                      <div className="h-6 w-20 skeleton ml-4" />
                    </div>
                    <div className="h-48 w-full skeleton mt-4" />
                  </div>
                ))}
              </div>
            ) : menuItems.length > 0 ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif font-semibold text-stone-800 border-b pb-2 border-stone-200">
                  {selectedCategory?.id === 'all' ? t('allItems') : selectedCategory?.name}
                </h2>

                {menuItems
                  .filter((item) =>
                    query.trim() === ""
                      ? true
                      : `${item.name} ${item.description}`
                          .toLowerCase()
                          .includes(query.toLowerCase())
                  )
                  .map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
              </div>
            ) : selectedCategory ? (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-stone-400 text-6xl mb-4">🍜</div>
                <h3 className="text-xl font-semibold text-stone-700 mb-2">{t('noItems')}</h3>
                <p className="text-stone-500">{t('noItemsDesc')}</p>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-stone-400 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-stone-700 mb-2">{t('selectCategory')}</h3>
                <p className="text-stone-500">{t('selectCategory')}</p>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;