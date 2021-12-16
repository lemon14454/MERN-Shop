import { CashIcon, TruckIcon, XIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearOrderSuccess,
  fetchOrders,
  selectOrder,
  setDeliver,
  setPayment,
} from "../redux/order";
import { selectUser } from "../redux/user";

const OrderList = ({ history }: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    orderList: { orders, success },
  } = useAppSelector(selectOrder);

  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }

    if (success) dispatch(clearOrderSuccess());

    dispatch(fetchOrders(userInfo?.token!));
  }, [dispatch, userInfo, success]);
  return (
    <table className="w-full bg-white relative">
      <thead className="font-bold text-md border-b-2 border-gray-300">
        <tr>
          <th>訂單編號</th>
          <th>使用者</th>
          <th>建立日期</th>
          <th>金額</th>
          <th>付款狀態</th>
          <th>運送狀態</th>
          <th>送達/付款</th>
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

            <td>{order.user.name}</td>
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
              <button
                onClick={() =>
                  dispatch(
                    setDeliver({ id: order._id, token: userInfo?.token! })
                  )
                }
                disabled={order.isDelivered}
                className={`${
                  !order.isDelivered
                    ? "bg-purple-500"
                    : "bg-gray-200 cursor-not-allowed"
                } px-4 py-2 rounded-sm shadow-sm`}
              >
                <TruckIcon className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    setPayment({
                      id: order._id,
                      paymentResult: { email_address: order.user.email },
                      token: userInfo?.token!,
                    })
                  )
                }
                disabled={order.isPaid}
                className={`${
                  !order.isPaid
                    ? "bg-yellow-500"
                    : "bg-gray-200 cursor-not-allowed"
                } px-4 py-2 rounded-sm shadow-sm`}
              >
                <CashIcon className="h-4 w-4 text-white" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
