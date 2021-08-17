import { XIcon } from "@heroicons/react/outline";
import { Formik } from "formik";
import { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMyOrders, selectOrder } from "../redux/order";
import { selectUser, togglePanel, updateUserProfile } from "../redux/user";
import { UpdateProfile } from "../util/validations";

const Profile = ({ history }: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  const {
    orderList: { orders },
  } = useAppSelector(selectOrder);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
      dispatch(togglePanel("login"));
    }

    dispatch(fetchMyOrders(userInfo?.token!));
  }, [dispatch, userInfo]);

  return (
    <div className="lg:flex gap-2 items-start">
      <div className="bg-white rounded-md p-4 shadow-md w-full lg:w-[450px]">
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

      <table className="w-full bg-white shadow-md mt-6 lg:mt-0">
        <thead className="font-bold text-md border-b-2 border-gray-300 shadow-md">
          <tr>
            <th>訂單編號</th>
            <th>建立日期</th>
            <th>金額</th>
            <th>付款狀態</th>
            <th>運送狀態</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders!.map((order) => (
            <tr
              key={order._id}
              className="text-xs border-b-[1px] border-gray-200 hover:bg-gray-100"
            >
              <td>
                <Link to={`/order/${order._id}`} className="font-bold">
                  {order._id}
                </Link>
              </td>

              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice.toLocaleString("zh-tw")}</td>
              <td className={`${order.isPaid ? "text-main" : ""}`}>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <XIcon className="text-red-500 h-5 w-5 mx-auto" />
                )}
              </td>
              <td className={`${order.isDelivered ? "text-main" : ""}`}>
                {order.isDelivered ? (
                  order.deliveredAt?.substring(0, 10)
                ) : (
                  <XIcon className="text-red-500 h-5 w-5 mx-auto" />
                )}
              </td>
              <td className="flex flex-col md:flex-row justify-evenly gap-y-2">
                <Link
                  to={`/order/${order._id}`}
                  className="py-2 px-4 bg-bg hover:bg-gray-200 border border-gray-200 rounded-sm"
                >
                  詳情
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
