import { Navigation, Footer } from "../components/SharedComponents";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About VISIONARY</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Crafting exceptional eyewear since 2010. Where vision meets style.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At VISIONARY, we believe that eyewear is more than just a tool for better vision—it's 
              a statement of personal style and confidence. Our mission is to create premium eyewear 
              that seamlessly blends cutting-edge design with uncompromising quality, ensuring that 
              every pair we craft enhances both sight and style.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're committed to sustainability and ethical manufacturing practices, working with 
              artisans who share our passion for excellence and our dedication to creating eyewear 
              that stands the test of time.
            </p>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-accent-foreground">✦</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  Every frame is meticulously crafted using premium materials and undergoes 
                  rigorous quality control to ensure perfection.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-accent-foreground">✧</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovative Design</h3>
                <p className="text-muted-foreground">
                  Our design team constantly pushes boundaries, creating timeless pieces 
                  that blend classic elegance with modern aesthetics.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-accent-foreground">◆</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We offer personalized service and 
                  comprehensive support throughout your eyewear journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Craftsmanship Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Craftsmanship</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Each pair of VISIONARY eyewear is a testament to traditional craftsmanship 
              enhanced by modern technology. Our master artisans hand-select materials, 
              carefully shape each frame, and perform detailed finishing work that ensures 
              every piece meets our exacting standards.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the initial sketch to the final polish, every step of our process is 
              guided by a commitment to excellence. We use only the finest acetates, 
              metals, and lens materials, sourced from trusted suppliers around the world.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
