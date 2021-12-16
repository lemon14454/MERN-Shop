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
    <div className="md:px-8 xl:px-24">
      <div className="p-2">
        <h1 className="text-2xl font-bold">最新商品</h1>
      </div>
      <div className="grid grid-cols-2 grid-row-2 lg:grid-cols-3 gap-y-4 gap-x-2 md:gap-x-8">
        {products &&
          products.map((product) => <Product {...product} key={product._id} />)}
      </div>

      <Pagination keyword={keyword} />
    </div>
  );
};

export default Home;
