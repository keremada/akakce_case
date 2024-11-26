export interface Product {
    code: number;
    name: string;
    imageUrl: string;
    dropRatio: number;
    price: number;
    countOfPrices: number;
    followCount: number;
    url: string;
  }
  
export interface ProductOption {
    capacity: number;
    price: number;
  }
  export interface ProductDetails {
    code: number;
    mkName: string;
    productName: string;
    badge: string;
    rating: number;
    imageUrl: string;
    storageOptions: number[];
    price: number;
    freeShipping: boolean;
    lastUpdate: string;
    options: ProductOption[];
  }
  
  // Interface for a product in the list (simplified)
  export interface ProductListItem {
    code: number;
    name: string;
    imageUrl: string;
    dropRatio: number;
    price: number;
    countOfPrices: number;
    followCount: number;
    url: string;
  }
  
  export interface ProductListResponse {
    horizontalProductList: ProductListItem[];
    productList: ProductListItem[];
    nextUrl: string | null;
  }
  