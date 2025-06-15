import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ShopContextProvider from "./context/ShopContext.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import Product from "./pages/Product.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductContextProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </ProductContextProvider>
  </BrowserRouter>
);
