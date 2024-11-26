import React from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { fetchProductDetails } from "~/utils/api";

export async function loader({ params }: { params: { id: string } }) {
  const url = `https://mock.akakce.dev/product${params.id}.json`;
  const product = await fetchProductDetails(url);

  product.options = product.storageOptions?.map((storageOption: number, index: number) => ({
    capacity: storageOption,
    price: product.price + index * 2000,
  })) || [];

  return product;
}

export default function ProductDetails() {
  const product = useLoaderData();
  const [selectedOption, setSelectedOption] = React.useState(product.options[0]);
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < rating ? "#FFD700" : "#ccc",
            fontSize: "1.2rem",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", position: "relative", backgroundColor: "#fff", borderRadius: "8px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            color: "#000",
            backgroundColor: "#FFD700",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          &larr; Ana Sayfa
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#66c2ed" }}>
              {product.mkName}
            </h1>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{product.productName}</h2>
            <p
              style={{
                display: "inline-block",
                fontSize: "1rem",
                color: "#000",
                fontWeight: "bold",
                backgroundColor: "#FFD700",
                padding: "0.3rem 0.5rem",
                borderRadius: "4px",
              }}
            >
              {product.badge}
            </p>
          </div>
          <div>{renderStars(product.rating)}</div>
        </div>
        <img
          src={product.imageUrl}
          alt={product.productName}
          style={{
            maxWidth: "250px",
            borderRadius: "8px",
            marginBottom: "1rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>
              Kapasite seçenekleri:
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {product.options.map((option: { capacity: string; price: number }) => (
                <button
                  key={option.capacity}
                  onClick={() => setSelectedOption(option)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: option.capacity === selectedOption.capacity ? "2px solid #007bff" : "2px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                  }}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#333", marginBottom: "1rem", textAlign: "center" }}>
            {product.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat seçeneği
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", marginBottom: "1rem", textAlign: "center" }}>
            {selectedOption?.price || product.price} TL
          </p>
          {product.freeShipping && (
            <p style={{ color: "green", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
              Ücretsiz kargo
            </p>
          )}
          <p style={{ fontSize: "0.8rem", color: "#666", textAlign: "center" }}>
            Son güncelleme: {product.lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
}
