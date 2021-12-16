import { ProductType } from "../redux/types";
import { Link } from "react-router-dom";

const Product = ({ _id, name, image, category, brand, price }: ProductType) => {
  return (
    <Link to={`/product/${_id}`}>
      <div className="rounded-md bg-white col-span-1 row-span-1 overflow-hidden relative h-full">
        <div className="flex items-center justify-center p-4">
          <img src={image} alt={_id} className="" />
        </div>

        <div className="p-4 pb-12">
          <p className="text-xs text-gray-400">
            {brand} · {category}
          </p>
          <h3 className="font-semibold text-sm">{name}</h3>
          <div className="flex absolute bottom-[10px] justify-between w-[95%] md:w-[90%]">
            <p className="text-gray-700 text-xs">
              $ {price.toLocaleString("zh-tw")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
