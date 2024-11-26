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

  const loadMore = async () => {
    if (!next) return;
    const response = await fetch(next);
    const data = await response.json();
    setProducts([...products, ...data.productList]);
    setNext(data.nextUrl);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <Link
            key={product.code}
            to={`/product/${product.code}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                height: "450px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Discount Badge */}
              <p
                style={{
                  margin: "0 0 10px 10px",
                  backgroundColor: "red",
                  borderRadius: "50px",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  alignSelf: "flex-start", // Align badge to top-left
                }}
              >
                %{product.dropRatio}
              </p>

              {/* Product Image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  maxHeight: "200px",
                  margin: "0 auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />

              {/* Product Info */}
              <h3
                style={{
                  fontSize: "1rem",
                  margin: "0.5rem 0",
                  color: "#66c2ed",
                  textAlign: "center",
                }}
              >
                {product.name}
              </h3>

              {/* Price, Seller, and Followers */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#333",
                    margin: "0",
                  }}
                >
                  {product.price} TL
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    margin: "0",
                  }}
                >
                  {product.countOfPrices} satıcı &gt;
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    margin: "0",
                  }}
                >
                  {product.followCount}+ takip
                </p>
              </div>
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
