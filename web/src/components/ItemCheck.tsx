import { useAppDispatch, useAppSelector } from "../app/hooks";
import { nextStep, selectCart } from "../redux/cart";
import CheckoutComponent from "./CheckoutComponent";

const ItemCheck = () => {
  const dispatch = useAppDispatch();
  const { CartItems } = useAppSelector(selectCart);
  return (
    <CheckoutComponent title="商品確認">
      {CartItems.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-5 gap-x-8 text-gray-500 items-center mb-3"
        >
          <h3 className="col-span-3">{item.name}</h3>
          <p className="col-span-1">${item.price.toLocaleString("zh-tw")}</p>
          <p className="col-span-1">x {item.qty}</p>
        </div>
      ))}
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
            $
            {(CartItems as any[])
              .reduce((acc: number, item) => acc + item.qty * item.price, 0)
              .toLocaleString("zh-tw")}
          </h2>
          <p className="text-gray-600 text-sm">商品金額</p>
        </div>
        <div>
          <h2 className="text-2xl font-medium">$60</h2>
          <p className="text-gray-600 text-sm">運費</p>
        </div>
      </div>
      <div className="flex mt-12 justify-end">
        <button
          onClick={() => dispatch(nextStep())}
          className="rounded bg-main text-white font-medium hover:scale-105 transition duration-300 px-4 py-2"
        >
          下一步
        </button>
      </div>
    </CheckoutComponent>
  );
};

export default ItemCheck;
