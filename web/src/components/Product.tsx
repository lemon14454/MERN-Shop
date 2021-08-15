import { ProductType } from "../redux/types";
import { importImages } from "../redux/api";
import {
  AnnotationIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../redux/cart";

const Product = ({
  _id,
  name,
  image,
  category,
  brand,
  numReviews,
  price,
  stock,
}: ProductType) => {
  const images = importImages(
    require.context("../images", false, /\.(png|jpe?g)$/)
  );

  const dispatch = useAppDispatch();

  return (
    <div className="rounded-md shadow-md bg-white col-span-1 overflow-hidden relative">
      <div className="w-full md:h-[200px]">
        <img
          src={images[`${image}`]}
          alt={_id}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 pb-12">
        <p className="text-sm text-gray-400">
          {brand} · {category}
        </p>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex text-sm text-gray-400 mt-2 absolute bottom-[10px] justify-between w-[95%] md:w-[90%]">
          <p className="flex justify-center items-center text-main font-medium">
            <AnnotationIcon className="h-5 w-5 mr-1" />
            {numReviews}
          </p>
          <p className="flex justify-center items-center text-yellow-500 font-medium text-xl">
            $ {price.toLocaleString("zh-tw")}
          </p>
        </div>
      </div>

      <div className="absolute w-full h-full bg-black/75 top-0 left-0 flex flex-col justify-center items-center gap-y-6 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
        <button
          className="card-button"
          onClick={() => {
            if (stock > 0) dispatch(addToCart({ id: _id, qty: 1 }));
          }}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" /> 加入購物車
        </button>
        <Link to={`/product/${_id}`}>
          <button className="card-button">
            <InformationCircleIcon className="h-5 w-5 mr-2" />
            商品細節
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
