import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { fetchCategoriesAsync, setCategories } from "../../store/category/category.actions";
import { useDispatch } from "react-redux";


const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = () => {
      dispatch(fetchCategoriesAsync);
    };
    getCategoryMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
