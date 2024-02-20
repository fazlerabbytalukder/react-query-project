import { useState } from "react";
import ProductsDetails from "./components/ProductsDetails";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/addProduct";

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  }

  // console.log(selectedProductId);
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductsList onProductClick={handleProductClick} />
      <ProductsDetails id={selectedProductId} />
    </div>
  );
}