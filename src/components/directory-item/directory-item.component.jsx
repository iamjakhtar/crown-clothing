import { useNavigate } from "react-router-dom";
import {
  CategoryItemContainer,
  Body,
  BackgroundImage,
} from "./directory-item.styles";

const CategoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;

  const navigate = useNavigate();

  const handleNavigate = () => navigate(route);
  return (
    <CategoryItemContainer onClick={handleNavigate}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  );
};
export default CategoryItem;
