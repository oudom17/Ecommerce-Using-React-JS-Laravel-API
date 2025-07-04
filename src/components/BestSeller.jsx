import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";
import Title from "../components/Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }
  // const [bestSeller, setBestSeller] = useState([]);
  // useEffect(() => {
  //   setBestSeller(products);
  // }, [bestSeller]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, autem
          Lorem ipsum dolor sit amet..
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            image={item.image_path}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
