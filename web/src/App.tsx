import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import ProductList from "./pages/ProductList";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-6 pt-[100px] md:pt-[150px]">
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/admin/productlist" component={ProductList} exact />
        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductList}
          exact
        />
        <Route path="/admin/product/:id/edit" component={ProductEdit} />
      </main>

      <Modal />
    </Router>
  );
};

export default App;
