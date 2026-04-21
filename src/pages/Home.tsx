import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Navigation, Footer, ProductCard } from "../components/SharedComponents";
import { getNewArrivals, Product } from "../data/products";
import heroMan from "../assets/hero-man.jpg";
import heroWoman from "../assets/hero-woman.jpg";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewArrivals = async () => {
      try {
        const data = await getNewArrivals();
        setNewArrivals(data);
      } catch (error) {
        console.error("Error loading new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewArrivals();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              See the World<br />Your Way
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover premium eyewear that combines style, comfort, and clarity. 
              Handcrafted designs for the modern individual.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={heroMan} 
                alt="Man wearing stylish eyeglasses"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                <p className="text-white/90">Bold & Sophisticated</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={heroWoman} 
                alt="Woman wearing stylish sunglasses"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                <p className="text-white/90">Elegant & Refined</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-lg font-semibold">
                Discover More
              </Button>
            </Link>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out our latest collection of premium eyewear
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <p className="text-lg text-muted-foreground">Loading new arrivals...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center">
              <Link to="/products">
                <Button variant="outline" size="lg" className="px-8">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">✓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Craftsmanship</h3>
                <p className="text-muted-foreground">Handcrafted with precision and care</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">★</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
                <p className="text-muted-foreground">Only the finest materials used</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-accent-foreground">♥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Perfect Fit Guaranteed</h3>
                <p className="text-muted-foreground">Comfortable wear all day long</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
