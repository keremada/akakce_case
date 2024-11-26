import { ProductListResponse, ProductDetails } from "~/models/product";

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

// Fetch the list of products
export async function fetchProducts(url: string): Promise<ProductListResponse> {
  return await fetchData<ProductListResponse>(url);
}

// Fetch details for a single product
export async function fetchProductDetails(url: string): Promise<ProductDetails> {
  return await fetchData<ProductDetails>(url);
}
