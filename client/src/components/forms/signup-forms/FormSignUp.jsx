import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateFormSignUp,
  updateFormStage,
} from "../../../store/registerSlice";

import { RightArrow, LeftArrow, EyeIcon, EyeSlashIcon } from "../../Icons";
import PasswordInput from "../../UI/PasswordInput";
import FormRow from "../../UI/FormRow";

import { useTranslation } from "react-i18next";

const FormSignUp = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // get redux store values
  const { email, password, confirmPassword } = useSelector(
    (state) => state.registerForm.formSignUp
  );

  // form values initial state
  const [formData, setFormData] = useState({
    email,
    password,
    confirmPassword,
  });

  // show and hide password
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  // match and check length for passwords
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validPasswordFormat, setValidPasswordFormat] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword" && value !== formData.password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    if (name === "password" && value.length < 6) {
      setValidPasswordFormat(false);
    } else {
      setValidPasswordFormat(true);
    }
  };

  // validate and move to next step

  const isValid =
    formData.email &&
    formData.password &&
    validPasswordFormat &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const submitHandler = (e) => {
    e.preventDefault();

    if (isValid) {
      dispatch(updateFormStage(2));
      dispatch(
        updateFormSignUp({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      );
    }
  };

  const direction = document.documentElement.getAttribute("dir");

  return (
    <>
      <h2 className="mb-3 text-center font-bold text-4xl text-[var(--mainColor)]">
        {t("signUp_title")}
      </h2>
      <form className="flex flex-col gap-4 mb-3" onSubmit={submitHandler}>
        <FormRow
          type="email"
          name="email"
          labelText={t("label_email")}
          value={formData.email}
          handleChange={changeHandler}
        />
        <PasswordInput
          labelText={t("label_password")}
          name="password"
          value={formData.password}
          handleChange={changeHandler}
        />
        {!validPasswordFormat && (
          <span className="text-red-600">{t("password_characters")}</span>
        )}
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-[var(--mainTxt)] dark:text-[var(--mainDark-txt)]"
          >
            {t("label_confirmPass")}
          </label>
          <input
            id="confirmPassword"
            autoComplete="confirmPassword"
            className="p-1 border-[1px] solid rounded-lg w-full input-shadow focus:outline-[var(--mainColor)] dark:bg-[#404363] dark:focus:outline-none dark:text-white"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={changeHandler}
          />
          <button
            type="button"
            className="absolute translate-y-1 ltr:right-2 rtl:left-2 text-[var(--secondaryTxt)]"
            onClick={showPasswordHandler}
          >
            {!showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>

        {!passwordsMatch && (
          <span className="text-red-600">{t("password_match")}</span>
        )}
        <button
          type="submit"
          className={`py-2 w-full flex items-center ${
            isValid ? "bg-[var(--mainColor)]" : "bg-[#b3b3b3]"
          } justify-center gap-2 text-xl rounded-md text-white font-semibold shadow-md`}
          disabled={!isValid}
        >
          {t("complete_signUp_title")}{" "}
          {direction === "rtl" ? <LeftArrow /> : <RightArrow />}
        </button>
      </form>
    </>
  );
};
export default FormSignUp;
