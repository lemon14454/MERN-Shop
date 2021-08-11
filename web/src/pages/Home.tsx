import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RouteComponentProps } from "react-router-dom";
import { fetchProducts, selectProduct } from "../redux/product";
import Product from "../components/Product";

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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[30px] md:gap-x-[50px]">
      {products &&
        products.map((product) => <Product {...product} key={product._id} />)}
    </div>
  );
};

export default Home;
