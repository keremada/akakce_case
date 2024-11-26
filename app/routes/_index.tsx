import { useLoaderData } from "@remix-run/react";
import { fetchProducts } from "~/utils/api";
import HorizontalScroller from "~/components/HorizontalScroller";
import ProductList from "~/components/ProductList";

export async function loader() {
  return await fetchProducts("https://mock.akakce.dev/page.json");
}

export default function Index() {
  const { horizontalProductList, productList, nextUrl } = useLoaderData();

  return (
    <div>
      <HorizontalScroller products={horizontalProductList} />
      <ProductList initialProducts={productList} nextUrl={nextUrl} />
    </div>
  );
}
