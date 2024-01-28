import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const Title = styled.span`
  font-size: 28px;
  display: inline-block;
  margin-bottom: 25px;
  cursor: pointer;
  border-bottom: 5px solid transparent;
  &:hover {
    border-bottom: 5px solid red;
    transition: all ease-in-out;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;
