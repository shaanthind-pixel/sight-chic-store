import { Navigation, Footer } from "../components/SharedComponents";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, "Medium");
    removeFromWishlist(product.id);
    toast({
      title: "Moved to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemove = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>
        
        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground">Save items you love to view them later</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="grid md:grid-cols-[200px_1fr_auto] gap-4 md:gap-6 p-4 md:p-6">
                  <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                      <p className="text-2xl font-bold text-accent">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2">
                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 md:flex-none bg-accent hover:bg-accent/90"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Move to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRemove(item.id, item.name)}
                      className="flex-1 md:flex-none text-destructive hover:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
