import { IButtonProps } from "../../interfaces/IButtonProps";
import { ButtonTypes } from "../../types/ButtonTypes";
import {
  BaseButton,
  GoogleButton,
  InvertedButton,
  LoadingSpinner,
} from "./button.styles";
export const BUTTON_TYPE_CLASSES: ButtonTypes = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  switch (buttonType) {
    case BUTTON_TYPE_CLASSES.google:
      return GoogleButton;
    case BUTTON_TYPE_CLASSES.inverted:
      return InvertedButton;
    default:
      return BaseButton;
  }
};

const Button = ({ children, isLoading = false, buttonType, ...otherProps }: IButtonProps) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>
      {isLoading ? <LoadingSpinner /> : children}
    </CustomButton>
  );
};
export default Button;
