import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Navigation, Footer } from "../components/SharedComponents";
import collectionMen from "../assets/collection-men.jpg";
import collectionWomen from "../assets/collection-women.jpg";

const Collection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <style>{`
        .grid-card {
          position: relative;
          overflow: hidden;
        }
        .grid-card::before {
          content: "";
          position: absolute;
          background: rgba(0, 0, 0, 0.544);
          inset: 0;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 1s ease-in-out;
          z-index: 2;
        }
        .grid-card:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        .grid-card::after {
          content: attr(data-collection);
          position: absolute;
          text-transform: uppercase;
          background: white;
          color: #111;
          // top: 50%;
          // left: 50%;
          transform: translate(-50%, -50%);
          padding: 0.5rem 0.5rem;
          font-size: 1.4rem;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1s ease-in-out;
          z-index: 3;
          border-radius: 0.5rem;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          pointer-events: none;
        }
        .grid-card:hover::after {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections designed specifically for men and women,
            each featuring unique styles that complement your personality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Men's Collection */}
          <Link to="/all-products?collection=men" className="group">
            <div
              className="grid-card rounded-lg shadow-xl h-[600px]"
              data-collection="Men"
            >
              <img
                src={collectionMen}
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-0 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
                <Button
                  size="lg"
                  className="bg-white text-primary px-12 py-6 text-xl font-semibold pointer-events-none transition-colors duration-300 group-hover:bg-white/70"
                  tabIndex={-1}
                >
                  Men
                </Button>
              </div>
            </div>
          </Link>

          {/* Women's Collection */}
          <Link to="/all-products?collection=women" className="group">
            <div
              className="grid-card rounded-lg shadow-xl h-[600px]"
              data-collection="Women"
            >
              <img
                src={collectionWomen}
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-0 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
                <Button
                  size="lg"
                  className="bg-white text-primary px-12 py-6 text-xl font-semibold pointer-events-none transition-colors duration-300 group-hover:bg-white/70"
                  tabIndex={-1}
                >
                  Women
                </Button>
              </div>
            </div>
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
