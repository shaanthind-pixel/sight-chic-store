import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';
import { fetchProducts, fetchProductsByCategory, fetchProductById } from '../services/firestoreService';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: 'eyeglasses' | 'sunglasses') => Product[];
  getNewProducts: () => Product[];
  refetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: 'eyeglasses' | 'sunglasses'): Product[] => {
    return products.filter(product => product.category === category);
  };

  const getNewProducts = (): Product[] => {
    return products.filter(product => product.isNew).slice(0, 4);
  };

  const refetchProducts = async () => {
    await loadProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        getNewProducts,
        refetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
