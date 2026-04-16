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

// Image paths - use relative URLs instead of imports
const productGlasses = '/src/assets/product-glasses-1.jpg';
const productSunglasses = '/src/assets/product-sunglasses-1.jpg';
const productDetail1 = '/src/assets/product-detail-1.jpg';
const productDetail2 = '/src/assets/product-detail-2.jpg';
const productDetail3 = '/src/assets/product-detail-3.jpg';
const productDetail4 = '/src/assets/product-detail-4.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: "The Maverick - Tortoiseshell",
    price: 12490,
    category: "eyeglasses",
    image: productGlasses,
    images: [productDetail1, productDetail2, productDetail3, productDetail4],
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
    image: productGlasses,
    images: [productDetail2, productDetail3, productDetail1, productDetail4],
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
    image: productGlasses,
    images: [productDetail3, productDetail1, productDetail2, productDetail4],
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
    image: productGlasses,
    images: [productDetail4, productDetail2, productDetail3, productDetail1],
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
    image: productGlasses,
    images: [productDetail1, productDetail3, productDetail4, productDetail2],
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
    image: productSunglasses,
    images: [productDetail2, productDetail4, productDetail1, productDetail3],
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
    image: productSunglasses,
    images: [productDetail3, productDetail1, productDetail2, productDetail4],
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
    image: productSunglasses,
    images: [productDetail4, productDetail3, productDetail2, productDetail1],
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
    image: productSunglasses,
    images: [productDetail1, productDetail2, productDetail4, productDetail3],
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
    image: productSunglasses,
    images: [productDetail2, productDetail1, productDetail3, productDetail4],
    description: "Heritage-inspired wayfarer design with hand-polished acetate frames and premium lenses.",
    material: "Italian Acetate",
    frameWidth: "146mm",
    lensWidth: "52mm",
    bridgeWidth: "20mm",
    templeLength: "145mm",
    collection: "men"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: 'eyeglasses' | 'sunglasses'): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsByCollection = (collection: 'men' | 'women'): Product[] => {
  return products.filter(p => p.collection === collection || p.collection === 'unisex');
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};
