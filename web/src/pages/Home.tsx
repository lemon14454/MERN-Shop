import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RouteComponentProps } from "react-router-dom";
import { fetchProducts, selectProduct } from "../redux/product";
import Product from "../components/Product";

const Home = ({ history }: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    productList: { products },
  } = useAppSelector(selectProduct);

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[30px] md:gap-x-[50px]">
      {products &&
        products.map((product) => <Product {...product} key={product.name} />)}
    </div>
  );
};

export default Home;
