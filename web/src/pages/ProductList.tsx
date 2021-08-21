import { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  selectProduct,
  successClear,
} from "../redux/product";
import { selectUser } from "../redux/user";
import { PencilAltIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline";
import Pagination from "../components/Pagination";

interface MatchProps {
  pageNumber: string;
}

const ProductList = ({ match, history }: RouteComponentProps<MatchProps>) => {
  const dispatch = useAppDispatch();
  const {
    productList: { products },
    productCreate: { success: createSuccess, product: createdProduct },
    productDelete: { success: deleteSuccess },
  } = useAppSelector(selectProduct);

  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  const pageNumber = match.params.pageNumber || "1";

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }

    if (createSuccess) {
      history.push(`/admin/product/${createdProduct?._id}/edit`);
      dispatch(successClear());
    } else {
      dispatch(fetchProducts({ pageNumber }));
    }

    if (deleteSuccess) {
      dispatch(fetchProducts({ pageNumber }));
    }
  }, [dispatch, pageNumber, userInfo, createSuccess, deleteSuccess]);

  return (
    <>
      <table className="w-full bg-white shadow-md relative">
        <thead className="font-bold text-lg border-b-2 border-gray-300 shadow-md">
          <tr>
            <th>商品名稱</th>
            <th>價格</th>
            <th>類別</th>
            <th>品牌</th>
            <th>庫存</th>
            <th>
              <button
                onClick={() => dispatch(createProduct(userInfo?.token!))}
                className="bg-gray-500 px-4 py-2 rounded-sm hover:bg-gray-400 text-white"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product) => (
            <tr
              key={product._id}
              className={`text-xs border-b-[1px] border-gray-200 hover:bg-gray-100 ${
                product.stock === 0 ? "text-red-500 font-bold" : ""
              }`}
            >
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.stock}</td>
              <td className="flex flex-col md:flex-row justify-evenly gap-y-2">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="bg-main px-4 py-2 rounded-sm shadow-sm"
                >
                  <PencilAltIcon className="h-4 w-4 text-white" />
                </Link>
                <button
                  onClick={() =>
                    dispatch(
                      deleteProduct({
                        id: product._id,
                        token: userInfo?.token!,
                      })
                    )
                  }
                  className="bg-red-500 px-4 py-2 rounded-sm shadow-sm"
                >
                  <TrashIcon className="h-4 w-4 text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination isAdmin={userInfo?.isAdmin!} />
    </>
  );
};

export default ProductList;
