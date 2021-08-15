import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, updateUserProfile } from "../redux/user";
import { UpdateProfile } from "../util/validations";

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  return (
    <div className="flex gap-2">
      <div className="bg-white rounded-md p-4 shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6">使用者資料</h1>

        {userInfo && (
          <Formik
            initialValues={{
              name: userInfo.name,
              email: userInfo.email,
              password: "",
              password2: "",
            }}
            validationSchema={UpdateProfile}
            onSubmit={async (values) => {
              const user = {
                _id: userInfo._id,
                name: values.name,
                email: values.email,
                password: values.password,
                isAdmin: userInfo.isAdmin,
                token: userInfo.token,
              };

              dispatch(updateUserProfile(user));
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-y-2">
                <div className="w-full px-3">
                  <label className="form-label">使用者名稱</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="使用者名稱"
                    className="form-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className="user-form-error">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>

                <div className="w-full px-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className="user-form-error">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>

                <div className="w-full px-3">
                  <label className="form-label">密碼</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="若要更改密碼，請直接輸入新密碼"
                    className="form-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="user-form-error">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>

                <div className="w-full px-3">
                  <label className="form-label">確認密碼</label>
                  <input
                    type="password"
                    name="password2"
                    placeholder="請再次輸入新密碼"
                    className="form-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                  />
                  <p className="user-form-error">
                    {errors.password2 && touched.password2 && errors.password2}
                  </p>
                </div>

                <button
                  className="px-4 py-2 bg-main rounded-md shadow-md text-white ml-auto hover:bg-green-600 hover:scale-105 transition duration-300"
                  type="submit"
                  disabled={isSubmitting}
                >
                  更新
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Profile;
