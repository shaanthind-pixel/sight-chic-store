import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Navigation, Footer, ProductCard } from "../components/SharedComponents";
import { getProductsByCategory, getAllProducts, Product } from "../data/products";

const Products = () => {
  const [eyeglasses, setEyeglasses] = useState<Product[]>([]);
  const [sunglasses, setSunglasses] = useState<Product[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [eyeglassesData, sunglassesData, allProductsData] = await Promise.all([
          getProductsByCategory('eyeglasses'),
          getProductsByCategory('sunglasses'),
          getAllProducts()
        ]);
        
        setEyeglasses(eyeglassesData);
        setSunglasses(sunglassesData);
        setFeaturedProduct(allProductsData[0] || null);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Loading products...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Featured Premium Product */}
        {featuredProduct && (
          <section className="mb-12 md:mb-16">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center bg-secondary rounded-lg overflow-hidden p-4 md:p-8">
              <div className="aspect-square">
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{featuredProduct.name}</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  {featuredProduct.description}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-accent mb-4 md:mb-6">
                  ₹{featuredProduct.price.toLocaleString('en-IN')}
                </p>
                <Link to={`/product/${featuredProduct.id}`}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
        
        {/* Eyeglasses Section */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Eyeglasses</h2>
            <Link to="/all-products?category=eyeglasses">
              <Button variant="outline" size="sm">See All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {eyeglasses.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Sunglasses Section */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Sunglasses</h2>
            <Link to="/all-products?category=sunglasses">
              <Button variant="outline" size="sm">See All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {sunglasses.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
