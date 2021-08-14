import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, selectUser, togglePanel } from "../redux/user";
import { LoginSchema } from "../util/validations";
import { XIcon, FastForwardIcon } from "@heroicons/react/solid";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    login: { error },
    panel,
  } = useAppSelector(selectUser);

  return (
    <div className="user-form">
      <button
        onClick={() => dispatch(togglePanel("none"))}
        className="absolute top-5 right-5 bg-red-500 rounded-md p-1 hover:scale-105 transition duration-100"
      >
        <XIcon className="h-5 w-5 text-white" />
      </button>

      <h1 className="font-bold text-3xl my-3">會員登入</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(value, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
            dispatch(login(value));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <input
              className="user-form-input"
              type="email"
              name="email"
              placeholder="請輸入信箱"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p className="user-form-error">
              {errors.email && touched.email && errors.email}
            </p>
            <input
              className="user-form-input"
              type="password"
              name="password"
              placeholder="請輸入密碼"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p className="user-form-error">
              {errors.password && touched.password && errors.password}
            </p>

            <div className="flex mt-6">
              <div className="text-xs">
                <p>
                  還沒有帳號?{" "}
                  <span
                    className="text-green-400 cursor-pointer hover:text-green-200"
                    onClick={() => dispatch(togglePanel("register"))}
                  >
                    註冊
                  </span>
                </p>
                {error && <p className="user-form-error mt-2">{error}</p>}
              </div>
              <button
                type="submit"
                className="form-button"
                disabled={isSubmitting}
              >
                登入
                <FastForwardIcon
                  className={`icon ${
                    isSubmitting ? "animate-pulse text-green-500" : ""
                  }`}
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
