import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategories } from "../../store/category/category.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";


const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoryMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesMap));
    };
    getCategoryMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
