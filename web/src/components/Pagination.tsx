import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectProduct } from "../redux/product";

interface PaginationProps {
  keyword?: string;
  isAdmin?: boolean;
}

const Pagination = ({ keyword = "", isAdmin = false }: PaginationProps) => {
  const {
    productList: { page, pages },
  } = useAppSelector(selectProduct);

  return pages > 1 ? (
    <div className="flex gap-4 p-4 mt-8">
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
          className={`${
            x + 1 === page
              ? "bg-main text-white"
              : "bg-white hover:bg-main/60 hover:text-white transition duration-300"
          } rounded-md px-4 py-2 font-bold`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export default Pagination;
