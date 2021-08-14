import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register, selectUser, togglePanel } from "../redux/user";
import { RegisterSchema } from "../util/validations";
import { XIcon, FastForwardIcon } from "@heroicons/react/solid";

const Register = () => {
  const dispatch = useAppDispatch();
  const {
    register: { error },
  } = useAppSelector(selectUser);

  return (
    <div className="user-form">
      <button
        onClick={() => dispatch(togglePanel("none"))}
        className="absolute top-5 right-5 bg-red-500 rounded-md p-1 hover:scale-105 transition duration-100"
      >
        <XIcon className="h-5 w-5 text-white" />
      </button>

      <h1 className="font-bold text-3xl my-3">會員註冊</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(value, { setSubmitting }) => {
          const data = {
            name: value.name,
            email: value.email,
            password: value.password,
          };

          setTimeout(() => {
            setSubmitting(true);
            dispatch(register(data));
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
              type="text"
              name="name"
              placeholder="請輸入使用者名稱"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <p className="user-form-error">
              {errors.name && touched.name && errors.name}
            </p>

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

            <input
              className="user-form-input"
              type="password"
              name="password2"
              placeholder="請再次輸入密碼"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password2}
            />
            <p className="user-form-error">
              {errors.password2 && touched.password2 && errors.password2}
            </p>

            <div className="flex mt-6">
              <div className="text-xs">
                <p>
                  已經有帳號?{" "}
                  <span
                    className="text-green-400 cursor-pointer hover:text-green-200"
                    onClick={() => dispatch(togglePanel("login"))}
                  >
                    登入
                  </span>
                </p>
                {error && <p className="user-form-error mt-2">{error}</p>}
              </div>
              <button
                type="submit"
                className="form-button"
                disabled={isSubmitting}
              >
                註冊
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

export default Register;
