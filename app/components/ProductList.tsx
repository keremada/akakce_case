import React, { useState } from "react";
import { Link } from "@remix-run/react"; // Import Link from Remix
import { Product } from "~/models/product";

interface Props {
  initialProducts: Product[];
  nextUrl: string | null;
}

export default function ProductList({ initialProducts, nextUrl }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [next, setNext] = useState(nextUrl);
  console.log(products);

  const loadMore = async () => {
    if (!next) return;
    const response = await fetch(next);
    const data = await response.json();
    setProducts([...products, ...data.productList]);
    setNext(data.nextUrl);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // Explicitly create 2 columns
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.code}
            to={`/product/${product.code}`} // Navigate to the product detail page
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                height:"450px",
              }}
            >
             <p style={{marginLeft:"10px", backgroundColor:"red", borderRadius: "50px", color:"white", paddingTop:"3px", paddingLeft:"3px",  paddingBottom:"3px", width:"50px"}}> % {product.dropRatio}</p>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  maxHeight: "250px",
                  marginLeft:"auto",
                  marginRight:"auto",
                  borderRadius: "8px",
                }}
              />
              <h3 style={{ fontSize: "1rem", margin: "0.5rem 0", color:"#66c2ed" }}>
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {product.price} TL
              </p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                {product.countOfPrices} satıcı &gt;
              </p>
              <br>
              </br>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                {product.followCount}+ takip
              </p>
            </div>
          </Link>
        ))}
      </div>
      {next && (
        <button
          onClick={loadMore}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#FFD700",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Daha Fazla Ürün
        </button>
      )}
    </div>
  );
}
