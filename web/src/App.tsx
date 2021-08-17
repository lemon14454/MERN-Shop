import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import OrderDetail from "./pages/OrderDetail";
import OrderList from "./pages/OrderList";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import UserEdit from "./pages/UserEdit";
import UserList from "./pages/UserList";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-6 pt-[100px]">
        <Route path="/" component={Home} exact />
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
      </main>

      <Modal />
    </Router>
  );
};

export default App;
