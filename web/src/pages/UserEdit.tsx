import { Formik } from "formik";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserDetail, selectUser, updateUser } from "../redux/user";
import { EditUser } from "../util/validations";

interface MatchProps {
  id: string;
}

const UserEdit = ({ history, match }: RouteComponentProps<MatchProps>) => {
  const userId = match.params.id;
  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
    user,
  } = useAppSelector(selectUser);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }

    dispatch(fetchUserDetail({ id: userId, token: userInfo?.token! }));
  }, [dispatch, userInfo, userId]);

  return (
    <div className="w-full max-w-3xl bg-white rounded-md shadow-md py-8 px-16 mx-auto">
      <h1 className="font-bold text-3xl mb-6">會員編輯</h1>
      {user && (
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          }}
          validationSchema={EditUser}
          onSubmit={async (values) => {
            await dispatch(
              updateUser({
                user: { ...user, ...values },
                token: userInfo?.token!,
              })
            );
            history.push("/admin/userlist");
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

              <div className="flex items-center mb-4 px-3">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={values.isAdmin}
                  onChange={handleChange}
                  className="mr-2 text-main rounded-full focus:ring-0"
                />
                <label className="text-gray-600">管理員權限</label>
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
  );
};

export default UserEdit;
