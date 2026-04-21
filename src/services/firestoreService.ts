import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../data/products';
import { uploadToCloudinary } from './cloudinaryService';

const PRODUCTS_COLLECTION = 'products';

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id),
        ...doc.data()
      } as Product);
    });
    return products.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (
  category: 'eyeglasses' | 'sunglasses'
): Promise<Product[]> => {
  try {
    const constraints: QueryConstraint[] = [where('category', '==', category)];
    const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id),
        ...doc.data()
      } as Product);
    });
    return products.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Fetch products by collection (men, women, unisex)
export const fetchProductsByCollection = async (
  collection: 'men' | 'women' | 'unisex'
): Promise<Product[]> => {
  try {
    const constraints: QueryConstraint[] = [where('collection', '==', collection)];
    const q = query(db.collection ? collection(db, PRODUCTS_COLLECTION) : null, ...constraints);
    if (!q) return [];
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id),
        ...doc.data()
      } as Product);
    });
    return products.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (productId: number): Promise<Product | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(productId));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: productId,
        ...docSnap.data()
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Upload product image to Cloudinary
export const uploadProductImage = async (
  file: File,
  productId: number,
  imageName: string
): Promise<string> => {
  try {
    console.log(`Uploading ${imageName} image for product ${productId} to Cloudinary...`);
    const imageUrl = await uploadToCloudinary(file);
    console.log('Image uploaded successfully:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Add new product
export const addProduct = async (productData: Omit<Product, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (
  productId: number,
  productData: Partial<Product>
): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(productId));
    await updateDoc(docRef, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(productId));
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Delete image from Firebase Storage
export const deleteProductImage = async (imageUrl: string): Promise<void> => {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
