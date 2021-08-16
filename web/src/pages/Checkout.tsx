import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, togglePanel } from "../redux/user";
import { clearCart, selectCart } from "../redux/cart";
import { clearCreatedOrder, selectOrder } from "../redux/order";
import ItemCheck from "../components/ItemCheck";
import AddressCheck from "../components/AddressCheck";
import PaymentCheck from "../components/PaymentCheck";
import OrderCheck from "../components/OrderCheck";

const Checkout = ({ history }: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);
  const { step } = useAppSelector(selectCart);
  const {
    createdOrder: { order },
  } = useAppSelector(selectOrder);

  useEffect(() => {
    if (!userInfo) {
      // 登入後才能結帳
      history.push("/cart");
      dispatch(togglePanel("login"));
    }

    if (order) {
      // 訂單建立完成跳到 訂單頁面
      dispatch(clearCart());
      dispatch(clearCreatedOrder());
      history.push("/");
    }
  }, [userInfo, dispatch, history, order]);

  return (
    userInfo && (
      <div className="flex justify-center">
        {step === 1 ? (
          <ItemCheck />
        ) : step === 2 ? (
          <AddressCheck />
        ) : step === 3 ? (
          <PaymentCheck />
        ) : (
          <OrderCheck />
        )}
      </div>
    )
  );
};

export default Checkout;
