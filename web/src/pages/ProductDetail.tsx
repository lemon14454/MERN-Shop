import { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Rating from "../components/Rating";
import { importImages } from "../redux/api";
import { addToCart } from "../redux/cart";
import { fetchProductById, selectProduct } from "../redux/product";

interface IParam {
  id: string;
}

const ProductDetail = ({ match }: RouteComponentProps<IParam>) => {
  const [qty, setQty] = useState(1);

  const dispatch = useAppDispatch();
  const {
    productDetail: { product },
  } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProductById(match.params.id));
  }, [match, dispatch]);

  const images = importImages(
    require.context("../images", false, /\.(png|jpe?g)$/)
  );

  const stockShow = product?.stock! >= 5 ? 5 : product?.stock;

  return (
    <div className="flex flex-col md:flex-row justify-center gap-y-8 gap-x-20 items-center">
      <img
        className="max-w-[350px] lg:max-w-[500px] rounded-md shadow-sm"
        src={images[`${product?.image}`]}
        alt={product?._id}
      />
      <div className="max-w-[500px]">
        <Link
          to="/"
          className="py-2 px-4 bg-bg hover:bg-gray-200 border border-gray-200 rounded-sm"
        >
          返回
        </Link>
        <p className="text-gray-400 text-md mt-6">
          {product?.brand} · {product?.category}
        </p>
        <h1 className="font-semibold text-3xl">{product?.name}</h1>
        <Rating
          value={product?.rating!}
          text={`${product?.numReviews}`}
          color="text-yellow-500"
        />
        <p className="my-6">{product?.description}</p>
        <div className="flex justify-between items-center border-t-[1px] border-gray-300 pt-6">
          <p className="font-medium text-2xl">
            ${product?.price.toLocaleString("zh-tw")}
          </p>
          <div>
            {stockShow! > 0 ? (
              <>
                <select
                  className=" border-gray-300 border-2 h-[45px] px-3 mr-3 rounded-lg focus:border-main focus:ring-main"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(stockShow).keys()].map((x) => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    dispatch(addToCart({ id: product?._id!, qty: qty }))
                  }
                  className="rounded-md px-4 py-2 bg-main text-white cursor-pointer transition duration-300 hover:scale-105"
                >
                  加入購物車
                </button>
              </>
            ) : (
              <button
                className="rounded-md px-4 py-2 bg-red-500/30 text-white cursor-not-allowed"
                disabled
              >
                缺貨中
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
