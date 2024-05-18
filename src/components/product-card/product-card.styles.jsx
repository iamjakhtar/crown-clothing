import styled from "styled-components";
import { InvertedButton } from "../button/button.styles";

export const ProductImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  ${InvertedButton} {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }
  &:hover {
    ${InvertedButton} {
      display: flex;
      opacity: 0.85;
    }
    ${ProductImage} {
      opacity: 0.7;
    }
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const ProductName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

// export const ProductPrice = styled.span`
//   width: 10%;
// `;
