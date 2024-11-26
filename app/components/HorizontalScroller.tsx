import React, { useState } from "react";
import { Link } from "@remix-run/react"; // Import Link for navigation
import { Product } from "~/models/product";

export default function HorizontalScroller({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const container = e.currentTarget;
    const currentIndex = Math.round(container.scrollLeft / container.offsetWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      {/* Scrollable Area */}
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          gap: "1rem",
          padding: "1rem 0",
          width: "100%",
        }}
        onScroll={handleScroll}
      >
        {products.map((product, index) => (
          <Link
            key={product.code}
            to={`/product/${product.code}`} // Navigate to the product detail page
            style={{
              flex: "0 0 100%", // Each product takes up the full width of the viewport
              scrollSnapAlign: "center",
              textDecoration: "none", // Remove default link styles
              color: "inherit",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "left", // Align text to the left inside its container
                width: "100%",
                maxWidth: "300px",
                minHeight: "230px",
                display: "flex", // Row layout
                flexDirection: "column", // Stack content vertically
                gap: "1rem",
                justifyContent: "space-between", // Distribute space between content
              }}
            >
              {/* Image and Text Row */}
              <div
                style={{
                  display: "flex", // Row layout for image and text
                  alignItems: "center", // Center vertically
                  gap: "1rem", // Space between image and text
                }}
              >
                {/* Image */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "120px", // Fixed width for the image
                    height: "120px", // Fixed height for the image
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />

                {/* Text Section */}
                <div
                  style={{
                    flex: 1, // Take up remaining space
                    display: "flex",
                    flexDirection: "column", // Stack text items vertically
                  }}
                >
                  <p style={{backgroundColor:"red", borderRadius: "50px", color:"white", paddingTop:"3px", paddingLeft:"3px",  paddingBottom:"3px", width:"50px"}}> % {product.dropRatio}</p>
                  <h3 style={{ fontSize: "1rem", margin: "0.5rem 0", color:"#66c2ed" }}>{product.name}</h3>
                  <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                    {product.price} TL
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    {product.countOfPrices} satıcı &gt;
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    {product.followCount}+ takip
                  </p>
                </div>
              </div>

              {/* Pagination Indicators */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Centers the dots horizontally
                  gap: "0.3rem",
                  marginTop: "1rem", // Space above the dots
                }}
              >
                {products.map((_, indicatorIndex) => (
                  <div
                    key={indicatorIndex}
                    style={{
                      width: "8px", // Smaller dots
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: indicatorIndex === activeIndex ? "#007bff" : "#ccc",
                      transition: "background-color 0.3s ease",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
