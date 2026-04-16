import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Navigation, Footer } from "../components/SharedComponents";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe("pk_test_your_stripe_publishable_key_here");

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "India"
  });
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 840;
  const total = subtotal + shippingCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (paymentMethod === 'stripe') {
      await handleStripePayment();
    } else if (paymentMethod === 'razorpay') {
      await handleRazorpayPayment();
    }

    setIsProcessing(false);
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      setError("Stripe not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    try {
      // Simulate API call to create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100, // Convert to paisa for INR
          currency: 'inr',
          customerInfo
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zipCode,
              country: 'IN'
            }
          }
        }
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else {
        // Payment succeeded
        clearCart();
        alert('Payment successful! Order placed.');
        window.location.href = "/";
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      setError("Razorpay not loaded");
      return;
    }

    try {
      // Simulate API call to create Razorpay order
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total * 100, // Amount in paisa
          currency: 'INR',
          customerInfo
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();

      const options = {
        key: 'your_razorpay_key_id', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sight Chic Store',
        description: 'Purchase from Sight Chic Store',
        order_id: orderData.id,
        handler: function (response: any) {
          // Handle successful payment
          clearCart();
          alert('Payment successful! Order placed.');
          window.location.href = "/";
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: '' // Add phone if available
        },
        theme: {
          color: '#000000'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                {/* Stripe Card Payment */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      id="stripe"
                      name="payment"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => setPaymentMethod('stripe')}
                    />
                    <Label htmlFor="stripe" className="font-medium">Credit/Debit Card (Stripe)</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay securely with your card. Stripe handles all transactions.
                  </p>

                  {paymentMethod === 'stripe' && (
                    <div className="p-3 border border-border rounded bg-white">
                      <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                  )}
                </div>

                {/* Razorpay */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      id="razorpay"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                    />
                    <Label htmlFor="razorpay" className="font-medium">UPI/Net Banking/Cards (Razorpay)</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay with UPI, Net Banking, Credit/Debit Cards, or Wallets. Razorpay handles all transactions.
                  </p>
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹{shippingCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-accent hover:bg-accent/90"
                disabled={(!stripe && paymentMethod === 'stripe') || (!window.Razorpay && paymentMethod === 'razorpay') || isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </Card>

            <div className="text-center">
              <Link to="/cart">
                <Button variant="outline" className="w-full">
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;