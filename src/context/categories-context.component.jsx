import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../store/category/category.actions";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = () => {
      dispatch(fetchCategoriesAsync());
    };
    getCategoryMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
