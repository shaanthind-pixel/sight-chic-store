import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchProductsByCollection as fetchProductsByCollectionService,
} from '../services/firestoreService';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'eyeglasses' | 'sunglasses';
  image: string;
  images: string[];
  description: string;
  material: string;
  frameWidth: string;
  lensWidth: string;
  bridgeWidth: string;
  templeLength: string;
  isNew?: boolean;
  collection: 'men' | 'women' | 'unisex';
}

// Export Firestore functions for fetching products
export const getProductById = fetchProductById;

export const getProductsByCategory = fetchProductsByCategory;

export const getProductsByCollection = async (
  collection: 'men' | 'women' | 'unisex'
): Promise<Product[]> => {
  const products = await fetchProductsByCollectionService(collection);
  // Also include unisex products
  if (collection !== 'unisex') {
    const unisexProducts = await fetchProductsByCollectionService('unisex');
    return [...products, ...unisexProducts];
  }
  return products;
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const products = await fetchProducts();
  return products.filter(p => p.isNew);
};

// Get all products
export const getAllProducts = fetchProducts;
