import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-6 pt-[100px] md:pt-[150px]">
        <Route path="/" component={Home} exact />
      </main>

      <Modal />
    </Router>
  );
};

export default App;
