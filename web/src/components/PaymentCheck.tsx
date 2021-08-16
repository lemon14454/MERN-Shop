import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { lastStep, nextStep, setPaymentMethod } from "../redux/cart";
import CheckoutComponent from "./CheckoutComponent";

const PaymentCheck = () => {
  const dispatch = useAppDispatch();

  const [payment, setPayment] = useState<"信用卡" | "貨到付款">("信用卡");

  return (
    <CheckoutComponent title="付款方式">
      <form>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="payment"
            value="信用卡"
            checked={payment === "信用卡"}
            onChange={(e) => setPayment(e.target.value as "信用卡")}
            className="mr-2 text-main rounded-full focus:ring-0"
          />
          <label className="text-gray-600">信用卡</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="payment"
            value="貨到付款"
            checked={payment === "貨到付款"}
            onChange={(e) => setPayment(e.target.value as "貨到付款")}
            className="mr-2 text-main rounded-full focus:ring-0"
          />
          <label className="text-gray-600">貨到付款</label>
        </div>

        <div className="flex mt-12 justify-between">
          <button
            onClick={() => dispatch(lastStep())}
            className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
          >
            上一步
          </button>
          <button
            className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
            onClick={() => {
              dispatch(nextStep());
              dispatch(setPaymentMethod(payment));
            }}
            type="submit"
          >
            下一步
          </button>
        </div>
      </form>
    </CheckoutComponent>
  );
};

export default PaymentCheck;
