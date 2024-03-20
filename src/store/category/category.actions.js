import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from '../../utils/reducer/reducer.util';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START);

const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_SUCCESS, categories);

const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED, error);


export const fetchCategoriesAsync = async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}