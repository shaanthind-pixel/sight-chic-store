import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { products } from '../data/products';

/**
 * Seed Firestore with initial products from products.ts
 * Run this once to populate your database
 * 
 * Usage:
 * Import this function in a component and call it when needed
 * Or add a button in admin panel to trigger this
 */
export const seedFirestoreWithProducts = async () => {
  try {
    console.log('Starting to seed products to Firestore...');
    
    for (const product of products) {
      const docRef = doc(collection(db, 'products'), String(product.id));
      // Remove the id field since Firestore will use the document ID
      const { id, ...productData } = product;
      
      await setDoc(docRef, productData);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log(`Successfully seeded ${products.length} products to Firestore!`);
    alert(`Successfully added ${products.length} products to the database!`);
    return true;
  } catch (error) {
    console.error('Error seeding products:', error);
    alert('Error seeding products. Check console for details.');
    return false;
  }
};

/**
 * Development helper: Clear all products from Firestore
 * WARNING: This will delete all products from your database!
 */
export const clearAllProducts = async () => {
  try {
    const confirmed = window.confirm(
      'WARNING: This will delete ALL products from your database. Are you sure?'
    );
    if (!confirmed) return false;

    const productsRef = collection(db, 'products');
    // You would need to implement this with deleteDoc for each product
    console.log('To implement bulk delete, use Firebase Admin SDK or delete manually');
    return true;
  } catch (error) {
    console.error('Error clearing products:', error);
    return false;
  }
};
