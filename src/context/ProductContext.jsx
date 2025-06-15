import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import ErrorBoundary from "../components/ErrorBoundary";

const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          BASE_URL + "/login",
          {
            email: "admin@example.com",
            password: "password",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setToken(response.data.access_token);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching token:", err.message);
      }
    };
    fetchToken();
  }, [BASE_URL]);

  useEffect(() => {
    if (token) {
      console.log("Token fetched:", token, "error:", error);
    }
  }, [token, error]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return; // Prevent fetch if token is not available
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL + "/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(Object.values(response.data.data));
      } catch (err) {
        setError(err.message);
        console.log("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [BASE_URL, token]); // Added token to dependency array

  useEffect(() => {
    console.log("Products fetched:", products);
  }, [products]); // Log products when state updates

  return (
    <ProductContext.Provider value={{ products, token, loading, error }}>
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
export default ProductContextProvider;
