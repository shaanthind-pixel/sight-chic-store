import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../data/products';

// Seed data - Initial products to populate the database
const seedProducts: Product[] = [
  {
    id: 1,
    name: "The Maverick - Tortoiseshell",
    price: 12490,
    category: "eyeglasses",
    image: "https://via.placeholder.com/300?text=Maverick",
    images: ["https://via.placeholder.com/300?text=Maverick+1", "https://via.placeholder.com/300?text=Maverick+2"],
    description: "Bold acetate frames with a distinctive tortoiseshell pattern. Perfect for making a statement while maintaining professional elegance.",
    material: "Premium Acetate",
    frameWidth: "145mm",
    lensWidth: "52mm",
    bridgeWidth: "18mm",
    templeLength: "140mm",
    isNew: true,
    collection: "unisex"
  },
  {
    id: 2,
    name: "The Scholar - Matte Black",
    price: 10990,
    category: "eyeglasses",
    image: "https://via.placeholder.com/300?text=Scholar",
    images: ["https://via.placeholder.com/300?text=Scholar+1", "https://via.placeholder.com/300?text=Scholar+2"],
    description: "Classic round frames in sophisticated matte black. Timeless design meets modern comfort for everyday wear.",
    material: "Lightweight Metal",
    frameWidth: "142mm",
    lensWidth: "50mm",
    bridgeWidth: "20mm",
    templeLength: "145mm",
    collection: "men"
  },
  {
    id: 3,
    name: "The Minimalist - Clear",
    price: 9490,
    category: "eyeglasses",
    image: "https://via.placeholder.com/300?text=Minimalist",
    images: ["https://via.placeholder.com/300?text=Minimalist+1", "https://via.placeholder.com/300?text=Minimalist+2"],
    description: "Ultra-lightweight transparent frames for those who prefer subtle sophistication. Nearly invisible design with maximum comfort.",
    material: "TR90 Plastic",
    frameWidth: "140mm",
    lensWidth: "49mm",
    bridgeWidth: "19mm",
    templeLength: "142mm",
    isNew: true,
    collection: "women"
  },
  {
    id: 4,
    name: "The Executive - Gunmetal",
    price: 15990,
    category: "eyeglasses",
    image: "https://via.placeholder.com/300?text=Executive",
    images: ["https://via.placeholder.com/300?text=Executive+1", "https://via.placeholder.com/300?text=Executive+2"],
    description: "Premium titanium frames with a brushed gunmetal finish. Designed for professionals who demand excellence.",
    material: "Titanium Alloy",
    frameWidth: "148mm",
    lensWidth: "54mm",
    bridgeWidth: "17mm",
    templeLength: "143mm",
    collection: "men"
  },
  {
    id: 5,
    name: "The Artist - Navy Blue",
    price: 11490,
    category: "eyeglasses",
    image: "https://via.placeholder.com/300?text=Artist",
    images: ["https://via.placeholder.com/300?text=Artist+1", "https://via.placeholder.com/300?text=Artist+2"],
    description: "Creative expression meets functionality. Deep navy acetate frames with subtle color gradients.",
    material: "Acetate",
    frameWidth: "144mm",
    lensWidth: "51mm",
    bridgeWidth: "19mm",
    templeLength: "141mm",
    collection: "unisex"
  },
  {
    id: 6,
    name: "The Voyager - Polarized Black",
    price: 16690,
    category: "sunglasses",
    image: "https://via.placeholder.com/300?text=Voyager",
    images: ["https://via.placeholder.com/300?text=Voyager+1", "https://via.placeholder.com/300?text=Voyager+2"],
    description: "Premium polarized sunglasses with 100% UV protection. Perfect for adventurers and urban explorers alike.",
    material: "Acetate with Metal Accents",
    frameWidth: "147mm",
    lensWidth: "53mm",
    bridgeWidth: "18mm",
    templeLength: "145mm",
    isNew: true,
    collection: "unisex"
  },
  {
    id: 7,
    name: "The Icon - Gold Aviator",
    price: 18990,
    category: "sunglasses",
    image: "https://via.placeholder.com/300?text=Icon",
    images: ["https://via.placeholder.com/300?text=Icon+1", "https://via.placeholder.com/300?text=Icon+2"],
    description: "Timeless aviator style with modern enhancements. Gold-plated frames with gradient lenses.",
    material: "Stainless Steel",
    frameWidth: "150mm",
    lensWidth: "58mm",
    bridgeWidth: "16mm",
    templeLength: "140mm",
    collection: "unisex"
  },
  {
    id: 8,
    name: "The Diva - Rose Gold",
    price: 14990,
    category: "sunglasses",
    image: "https://via.placeholder.com/300?text=Diva",
    images: ["https://via.placeholder.com/300?text=Diva+1", "https://via.placeholder.com/300?text=Diva+2"],
    description: "Glamorous cat-eye frames in elegant rose gold. Make every entrance unforgettable.",
    material: "Premium Metal",
    frameWidth: "143mm",
    lensWidth: "52mm",
    bridgeWidth: "19mm",
    templeLength: "142mm",
    isNew: true,
    collection: "women"
  },
  {
    id: 9,
    name: "The Sport - Matte Gray",
    price: 13490,
    category: "sunglasses",
    image: "https://via.placeholder.com/300?text=Sport",
    images: ["https://via.placeholder.com/300?text=Sport+1", "https://via.placeholder.com/300?text=Sport+2"],
    description: "Performance-focused design with rubberized temples for secure fit during active pursuits.",
    material: "TR90 with Rubber Grip",
    frameWidth: "148mm",
    lensWidth: "55mm",
    bridgeWidth: "17mm",
    templeLength: "144mm",
    collection: "unisex"
  },
  {
    id: 10,
    name: "The Classic - Tortoise Brown",
    price: 12990,
    category: "sunglasses",
    image: "https://via.placeholder.com/300?text=Classic",
    images: ["https://via.placeholder.com/300?text=Classic+1", "https://via.placeholder.com/300?text=Classic+2"],
    description: "Heritage-inspired wayfarer design with hand-polished acetate frames and premium lenses.",
    material: "Italian Acetate",
    frameWidth: "146mm",
    lensWidth: "52mm",
    bridgeWidth: "20mm",
    templeLength: "145mm",
    collection: "men"
  }
];

/**
 * Seed Firestore with initial products from seedProducts
 * Run this once to populate your database
 * 
 * Usage:
 * Import this function in a component and call it when needed
 * Or add a button in admin panel to trigger this
 */
export const seedFirestoreWithProducts = async () => {
  try {
    console.log('Starting to seed products to Firestore...');
    
    for (const product of seedProducts) {
      const docRef = doc(collection(db, 'products'), String(product.id));
      // Remove the id field since Firestore will use the document ID
      const { id, ...productData } = product;
      
      await setDoc(docRef, productData);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log(`Successfully seeded ${seedProducts.length} products to Firestore!`);
    alert(`Successfully added ${seedProducts.length} products to the database!`);
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
