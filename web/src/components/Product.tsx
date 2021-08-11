import { ProductType } from "../redux/types";
import { importImages } from "../redux/api";
import {
  AnnotationIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Product = ({
  _id,
  name,
  image,
  category,
  brand,
  numReviews,
  price,
}: ProductType) => {
  const images = importImages(
    require.context("../images", false, /\.(png|jpe?g)$/)
  );

  return (
    <div className="rounded-md shadow-md bg-white col-span-1 overflow-hidden relative">
      <img
        src={images[`${image}`]}
        alt={_id}
        className="object-cover w-full h-9/12"
      />

      <div className="p-4 pb-12">
        <p className="text-sm text-gray-400">
          {brand} · {category}
        </p>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex text-sm text-gray-400 mt-2 absolute bottom-[10px] right-6 gap-x-4">
          <p className="flex justify-center items-center">
            <AnnotationIcon className="h-5 w-5 mr-1" />
            {numReviews}
          </p>
          <p className="flex justify-center items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-1" />
            {price}
          </p>
        </div>
      </div>

      <div className="absolute w-full h-full bg-black/75 top-0 left-0 flex flex-col justify-center items-center gap-y-6 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
        <button className="card-button">
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
