import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RouteComponentProps } from "react-router-dom";
import { fetchProducts, selectProduct } from "../redux/product";
import Product from "../components/Product";
import Pagination from "../components/Pagination";

interface MatchProps {
  keyword: string;
  pageNumber: string;
}

const Home = ({ match }: RouteComponentProps<MatchProps>) => {
  const dispatch = useAppDispatch();
  const {
    productList: { products },
  } = useAppSelector(selectProduct);

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || "1";

  useEffect(() => {
    dispatch(fetchProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold">最新商品</h1>
        <p className="text-gray-400 text-md">展示因素，每頁4筆</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[30px] md:gap-x-[50px]">
        {products &&
          products.map((product) => <Product {...product} key={product._id} />)}
      </div>

      <Pagination keyword={keyword} />
    </>
  );
};

export default Home;
