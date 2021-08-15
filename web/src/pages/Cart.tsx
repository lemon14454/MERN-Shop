import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeQty, removeFromCart, selectCart } from "../redux/cart";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { importImages } from "../redux/api";
interface MatchProps {
  id: string;
}

const Cart = ({ match, history }: RouteComponentProps<MatchProps>) => {
  const dispatch = useAppDispatch();
  const { CartItems } = useAppSelector(selectCart);

  const images = importImages(
    require.context("../images", false, /\.(png|jpe?g)$/)
  );

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 relative">
      <div className="bg-white rounded-md p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-6">購物車</h1>
        {CartItems.length === 0 ? (
          <p className="text-sm text-gray-400 w-[300px] md:w-[800px]">
            購物車是空的{" "}
            <Link to="/" className="text-main">
              返回
            </Link>
          </p>
        ) : (
          <div className="mt-5">
            {CartItems?.map((item) => (
              <div
                className="grid grid-cols-9 md:grid-cols-10 items-center gap-x-4 hover:bg-gray-100 p-4 rounded"
                key={item._id}
              >
                <div className="md:col-span-1 hidden md:inline-block">
                  <img
                    src={`${images[item.image]}`}
                    alt={item._id}
                    className="rounded-md"
                  />
                </div>

                <div className="col-span-3 flex font-bold">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>

                <div className="col-span-2 flex justify-center">
                  $ {item.price.toLocaleString("zh-tw")}
                </div>

                <div className="col-span-2 flex justify-center">
                  <select
                    className=" border-gray-300 border-2 h-[45px] w-[60px] px-3 mr-3 rounded-lg focus:border-main focus:ring-main"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        changeQty({ id: item._id, qty: Number(e.target.value) })
                      )
                    }
                  >
                    {[...Array(item.stock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    <TrashIcon className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {CartItems.length > 0 && (
        <div className="bg-white rounded-md p-4 shadow-md min-w-[400px] relative pb-8">
          <h1 className="text-3xl font-bold mb-8">總結</h1>
          <div className="top-3 right-3 absolute flex gap-x-2">
            <Link
              to="/"
              className="py-2 px-4 bg-bg hover:bg-gray-200 border border-gray-200 rounded"
            >
              繼續購物
            </Link>
            <button className="flex items-center bg-main text-white px-4 py-2 rounded font-semibold hover:scale-105 transform transition">
              結帳
              <CheckCircleIcon className="icon" />
            </button>
          </div>

          <div className="flex justify-around items-center">
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
        </div>
      )}
    </div>
  );
};

export default Cart;
