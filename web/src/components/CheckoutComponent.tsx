import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectCart } from "../redux/cart";

interface CheckoutProps {
  children: React.ReactNode;
  title: string;
}

const CheckoutComponent = ({ children, title }: CheckoutProps) => {
  const { step } = useAppSelector(selectCart);

  return (
    <div className="flex relative w-[500px]">
      <div className="flex items-center justify-center rounded-[50%] bg-main text-white min-w-[30px] h-[30px] mr-12 font-bold">
        {step}
        <div className="absolute border-main border-r-2 border-dashed h-full top-[40px]"></div>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="mt-5 transition transform opacity-100">{children}</div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
