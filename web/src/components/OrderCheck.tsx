import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { lastStep, selectCart } from "../redux/cart";
import { createOrder, selectOrder } from "../redux/order";
import { selectUser } from "../redux/user";
import CheckoutComponent from "./CheckoutComponent";

const OrderCheck = () => {
  const dispatch = useAppDispatch();
  const { CartItems, shippingAddress, paymentMethod } =
    useAppSelector(selectCart);

  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  const itemTotal = (CartItems as any[]).reduce(
    (acc: number, item) => acc + item.qty * item.price,
    0
  );

  // 運費目前設為60
  const totalPrice = itemTotal + 60;
  const orderItems = CartItems.map(({ stock, ...other }) => other);

  const placeOrderHandler = () => {
    const order = {
      orderItems,
      paymentMethod,
      shippingAddress,
      totalPrice,
    };
    dispatch(createOrder({ order, token: userInfo?.token! }));
  };

  return (
    <CheckoutComponent title="訂單總結">
      <div className="flex justify-around items-center mt-12">
        <div>
          <h2 className="text-2xl font-medium">
            {(CartItems as any[]).reduce(
              (acc: number, item) => acc + item.qty,
              0
            )}
          </h2>
          <p className="text-gray-600 text-sm">商品數量</p>
        </div>
        <div>
          <h2 className="text-2xl font-medium">
            $ {itemTotal.toLocaleString("zh-tw")}
          </h2>
          <p className="text-gray-600 text-sm">商品金額</p>
        </div>
        <div>
          <h2 className="text-2xl font-medium">$60</h2>
          <p className="text-gray-600 text-sm">運費</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-y-2 justify-center">
        <h3 className="font-bold text-lg">運送地址</h3>
        <p className="mb-2 text-gray-600">
          {shippingAddress.postalCode} {shippingAddress.country}{" "}
          {shippingAddress.city} {shippingAddress.address}
        </p>

        <h3 className="font-bold text-lg">付款方式</h3>
        <p className="text-gray-600 mb-2">{paymentMethod}</p>

        <h3 className="font-bold text-lg">需付金額</h3>
        <p className="text-gray-600 mb-2">$ {totalPrice}</p>
      </div>

      <div className="flex mt-6 justify-between">
        <button
          onClick={() => dispatch(lastStep())}
          className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
        >
          上一步
        </button>
        <button
          className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
          onClick={placeOrderHandler}
        >
          送出訂單
        </button>
      </div>
    </CheckoutComponent>
  );
};

export default OrderCheck;
