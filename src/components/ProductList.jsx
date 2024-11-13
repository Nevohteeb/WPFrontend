import { useContext, useEffect, useState } from "react";
import wooCommerceApi from "../woocommerceApi";
import { CartContext } from "../context/CartContext";
import Seo from "./Seo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await wooCommerceApi.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // add product to cart
  };

  return (
    <>
      <Seo
        title="Shop - My First Wp"
        description="Explore our wide range of products"
        url={window.location.href}
      />
      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>

              {/* Dispaly prodcut image */}
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  style={{ width: "150px", height: "150px" }}
                />
              )}

              {/* Display Price */}
              <p>Price: ${(product.prices.price / 100).toFixed(2)}</p>

              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
