import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleSignInStart } from "../../store/user/user.actions";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer, SigninContainer } from "./sign-in-form.styles";
import { emailSignInStart } from '../../store/user/user.actions';

const signInFields = {
  email: "",
  password: "",
};

const SigInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(signInFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(signInFields);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Email or password is incorrect.");
          break;
        default:
          console.log("Error logging you in.");
      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <SigninContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label="Email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
        />
        <FormInput
          label="Password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
        />
        <ButtonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            GOOGLE SIGN IN
          </Button>
        </ButtonsContainer>
      </form>
    </SigninContainer>
  );
};
export default SigInForm;
