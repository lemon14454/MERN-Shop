import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import "./styles.css";

// lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const OrderList = lazy(() => import("./pages/OrderList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Profile = lazy(() => import("./pages/Profile"));
const UserEdit = lazy(() => import("./pages/UserEdit"));
const UserList = lazy(() => import("./pages/UserList"));

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-6">
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={Home}
              exact
            />

            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/profile" component={Profile} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order/:id" component={OrderDetail} />
            <Route path="/admin/productlist" component={ProductList} exact />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductList}
              exact
            />
            <Route path="/admin/product/:id/edit" component={ProductEdit} />
            <Route path="/admin/userlist" component={UserList} exact />
            <Route path="/admin/user/:id/edit" component={UserEdit} />
            <Route path="/admin/orderlist" component={OrderList} exact />
          </Switch>
        </Suspense>
      </main>

      <Modal />
      <Toaster />
    </Router>
  );
};

export default App;
