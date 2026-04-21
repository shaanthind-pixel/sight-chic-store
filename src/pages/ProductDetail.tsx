import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Navigation, Footer } from "../components/SharedComponents";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getProductById, Product } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(Number(id));
        if (productData) {
          setProduct(productData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-6 md:py-8 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return <Navigate to="/404" replace />;
  }

  const inWishlist = isInWishlist(product.id);

  const features = [
    `${product.material} frames`,
    "Anti-reflective coating",
    "UV protection",
    "Lightweight design",
    "Spring hinges for durability",
    "Adjustable nose pads"
  ];

  const specifications = {
    "Frame Material": product.material,
    "Frame Width": product.frameWidth,
    "Lens Width": product.lensWidth,
    "Bridge Width": product.bridgeWidth,
    "Temple Length": product.templeLength
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 md:mb-6 text-xs md:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-3 md:mb-4 rounded-lg overflow-hidden bg-secondary aspect-square">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-accent' 
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.isNew && <Badge className="mb-3 md:mb-4">New Arrival</Badge>}
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 md:h-5 md:w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">(128 reviews)</span>
            </div>

            <div className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-sm md:text-base">Size</h3>
              <div className="flex gap-2 md:gap-3">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 md:flex-none px-4 md:px-6 py-2 text-sm md:text-base rounded-md border-2 transition-all ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-semibold mb-3 text-sm md:text-base">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border border-border hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-md border border-border hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
              <Button 
                size="lg" 
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">Add to Cart</span>
              </Button>
              <Button 
                size="lg" 
                variant={inWishlist ? "default" : "outline"}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 md:h-5 md:w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-4 md:pt-6 mb-4 md:mb-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="border-t border-border pt-4 md:pt-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Specifications</h3>
              <div className="space-y-2 md:space-y-3">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
