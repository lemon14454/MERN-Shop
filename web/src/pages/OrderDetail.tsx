import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchOrderById, selectOrder, setPayment } from "../redux/order";
import { selectUser, togglePanel } from "../redux/user";
import { PayPalButton } from "react-paypal-button-v2";

interface IParam {
  id: string;
}

const OrderDetail = ({ match, history }: RouteComponentProps<IParam>) => {
  const dispatch = useAppDispatch();
  const {
    order: { order },
  } = useAppSelector(selectOrder);
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=TWD`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
      dispatch(togglePanel("login"));
    }

    dispatch(fetchOrderById({ id: match.params.id, token: userInfo?.token! }));

    if (!order?.isPaid && !sdkReady) {
      addPaypalScript();
    }
  }, [dispatch, match, userInfo, order?.isPaid, sdkReady]);

  const successPaymentHandler = (paymentResult: any) => {
    if (paymentResult.status === "COMPLETED") {
      dispatch(
        setPayment({ id: order?._id!, token: userInfo?.token!, paymentResult })
      );
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-md py-8 px-8 mx-auto max-w-screen-md">
      <h1 className="font-bold text-2xl">訂單資訊</h1>
      {order && (
        <div className="md:flex gap-x-12 h-full">
          <div className="mt-5 grid gap-y-2 grid-cols-4 md:flex flex-col justify-around flex-1">
            <div className="col-span-2">
              <h2 className="text-2xl font-medium">{order.user.name}</h2>
              <p className="text-gray-600 text-sm">使用者名稱</p>
            </div>
            <div className="col-span-2">
              <h2 className="text-2xl font-medium">
                {order.createdAt.substring(0, 10)}
              </h2>
              <p className="text-gray-600 text-sm">建立時間</p>
            </div>
            <div className="col-span-2">
              <h2 className="text-2xl font-medium">
                {order.orderItems.reduce(
                  (acc: number, item) => acc + item.qty,
                  0
                )}
              </h2>
              <p className="text-gray-600 text-sm">商品數量</p>
            </div>
            <div className="col-span-2">
              <h2 className="text-2xl font-medium">
                $ {order.totalPrice.toLocaleString("zh-tw")}
              </h2>
              <p className="text-gray-600 text-sm">需付金額</p>
            </div>
            <div className="col-span-2">
              <h2
                className={`text-2xl font-medium ${
                  order.isPaid ? "text-main" : "text-red-500"
                }`}
              >
                {order.isPaid ? "已付款" : "未付款"}
              </h2>
              <p className="text-gray-600 text-sm">付款狀態</p>
            </div>
            <div className="col-span-2">
              <h2
                className={`text-2xl font-medium ${
                  order.isDelivered ? "text-main" : "text-red-500"
                }`}
              >
                {order.isDelivered ? "已送達" : "未送達"}
              </h2>
              <p className="text-gray-600 text-sm">運送狀態</p>
            </div>
          </div>
          <div className="w-full md:w-[400px]">
            <div className="mt-10 md:mt-0 flex flex-col gap-y-2">
              <h3 className="font-bold text-lg">商品資訊</h3>
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-5 gap-x-8 text-gray-500 items-center mb-3 text-xs"
                >
                  <h3 className="col-span-3">{item.name}</h3>
                  <p className="col-span-2">
                    ${item.price.toLocaleString("zh-tw")} x {item.qty}
                  </p>
                </div>
              ))}

              <h3 className="font-bold text-lg">訂單編號</h3>
              <p className="mb-2 text-gray-600 text-xs">{order._id}</p>

              <h3 className="font-bold text-lg">運送地址</h3>
              <p className="mb-2 text-gray-600 text-xs">
                {order.shippingAddress.postalCode}{" "}
                {order.shippingAddress.country} {order.shippingAddress.city}{" "}
                {order.shippingAddress.address}
              </p>

              <h3 className="font-bold text-lg">付款方式</h3>
              <p className="text-gray-600 mb-2 text-xs">
                {order.paymentMethod}
              </p>

              {!order.isPaid &&
                sdkReady &&
                order.paymentMethod === "信用卡" && (
                  <PayPalButton
                    onButtonReady={() => setSdkReady(true)}
                    amount={order.totalPrice}
                    currency="TWD"
                    onSuccess={successPaymentHandler}
                  />
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
